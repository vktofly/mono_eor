import { getHubSpotConfig } from './config';

interface HubSpotContact {
  email: string;
  firstname?: string;
  lastname?: string;
  company?: string;
  phone?: string;
  website?: string;
  jobtitle?: string;
  industry?: string;
  lead_status?: string;
  lead_source?: string;
  notes?: string;
  custom_fields?: Record<string, any>;
}

interface HubSpotDeal {
  dealname: string;
  amount?: string;
  dealstage?: string;
  closedate?: string;
  pipeline?: string;
  dealtype?: string;
  description?: string;
  associated_contacts?: string[];
  associated_companies?: string[];
}

interface HubSpotCompany {
  name: string;
  domain?: string;
  industry?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  website?: string;
  description?: string;
}

class HubSpotService {
  private accessToken: string;
  private portalId: string;
  private baseUrl: string;

  constructor() {
    const config = getHubSpotConfig();
    this.accessToken = config.accessToken;
    this.portalId = config.portalId;
    this.baseUrl = 'https://api.hubapi.com';
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`HubSpot API error: ${response.status} - ${errorData.message || response.statusText}`);
    }

    return response.json();
  }

  // Contact Management
  async createContact(contact: HubSpotContact) {
    try {
      const response = await this.makeRequest('/crm/v3/objects/contacts', {
        method: 'POST',
        body: JSON.stringify({
          properties: {
            email: contact.email,
            firstname: contact.firstname,
            lastname: contact.lastname,
            company: contact.company,
            phone: contact.phone,
            website: contact.website,
            jobtitle: contact.jobtitle,
            industry: contact.industry,
            lead_status: contact.lead_status || 'new',
            lead_source: contact.lead_source || 'website',
            notes: contact.notes,
            ...contact.custom_fields,
          },
        }),
      });

      return {
        success: true,
        contactId: response.id,
        data: response,
      };
    } catch (error) {
      console.error('Error creating HubSpot contact:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async updateContact(contactId: string, contact: Partial<HubSpotContact>) {
    try {
      const response = await this.makeRequest(`/crm/v3/objects/contacts/${contactId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          properties: contact,
        }),
      });

      return {
        success: true,
        data: response,
      };
    } catch (error) {
      console.error('Error updating HubSpot contact:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async getContact(contactId: string) {
    try {
      const response = await this.makeRequest(`/crm/v3/objects/contacts/${contactId}`);
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      console.error('Error getting HubSpot contact:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async searchContactByEmail(email: string) {
    try {
      const response = await this.makeRequest('/crm/v3/objects/contacts/search', {
        method: 'POST',
        body: JSON.stringify({
          filterGroups: [
            {
              filters: [
                {
                  propertyName: 'email',
                  operator: 'EQ',
                  value: email,
                },
              ],
            },
          ],
          properties: ['email', 'firstname', 'lastname', 'company', 'phone'],
        }),
      });

      return {
        success: true,
        data: response.results || [],
      };
    } catch (error) {
      console.error('Error searching HubSpot contact:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Deal Management
  async createDeal(deal: HubSpotDeal) {
    try {
      const response = await this.makeRequest('/crm/v3/objects/deals', {
        method: 'POST',
        body: JSON.stringify({
          properties: {
            dealname: deal.dealname,
            amount: deal.amount,
            dealstage: deal.dealstage || 'appointmentscheduled',
            closedate: deal.closedate,
            pipeline: deal.pipeline || 'default',
            dealtype: deal.dealtype || 'newbusiness',
            description: deal.description,
          },
          associations: [
            ...(deal.associated_contacts?.map(contactId => ({
              to: { id: contactId },
              types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }],
            })) || []),
            ...(deal.associated_companies?.map(companyId => ({
              to: { id: companyId },
              types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 5 }],
            })) || []),
          ],
        }),
      });

      return {
        success: true,
        dealId: response.id,
        data: response,
      };
    } catch (error) {
      console.error('Error creating HubSpot deal:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Company Management
  async createCompany(company: HubSpotCompany) {
    try {
      const response = await this.makeRequest('/crm/v3/objects/companies', {
        method: 'POST',
        body: JSON.stringify({
          properties: {
            name: company.name,
            domain: company.domain,
            industry: company.industry,
            phone: company.phone,
            address: company.address,
            city: company.city,
            state: company.state,
            country: company.country,
            zip: company.zip,
            website: company.website,
            description: company.description,
          },
        }),
      });

      return {
        success: true,
        companyId: response.id,
        data: response,
      };
    } catch (error) {
      console.error('Error creating HubSpot company:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Form Submission
  async submitForm(formId: string, formData: Record<string, any>) {
    try {
      const response = await this.makeRequest(`/forms/v2/forms/${formId}/submissions`, {
        method: 'POST',
        body: JSON.stringify({
          fields: Object.entries(formData).map(([name, value]) => ({
            name,
            value: String(value),
          })),
        }),
      });

      return {
        success: true,
        data: response,
      };
    } catch (error) {
      console.error('Error submitting HubSpot form:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Lead Scoring and Automation
  async addContactToWorkflow(contactId: string, workflowId: string) {
    try {
      const response = await this.makeRequest(`/automation/v2/workflows/${workflowId}/enrollments/contacts/${contactId}`, {
        method: 'POST',
      });

      return {
        success: true,
        data: response,
      };
    } catch (error) {
      console.error('Error adding contact to workflow:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Analytics and Reporting
  async getContactAnalytics(contactId: string) {
    try {
      const response = await this.makeRequest(`/crm/v3/objects/contacts/${contactId}/associations/contacts`);
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      console.error('Error getting contact analytics:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Export singleton instance
export const hubspotService = new HubSpotService();

// Helper functions for common operations
export async function createLeadFromForm(formData: {
  email: string;
  name?: string;
  company?: string;
  phone?: string;
  message?: string;
  source?: string;
}) {
  const contactData: HubSpotContact = {
    email: formData.email,
    firstname: formData.name?.split(' ')[0],
    lastname: formData.name?.split(' ').slice(1).join(' '),
    company: formData.company,
    phone: formData.phone,
    lead_source: formData.source || 'website',
    notes: formData.message,
  };

  return await hubspotService.createContact(contactData);
}

export async function createDealFromContact(contactId: string, dealData: {
  dealName: string;
  amount?: string;
  description?: string;
}) {
  const deal: HubSpotDeal = {
    dealname: dealData.dealName,
    amount: dealData.amount,
    description: dealData.description,
    associated_contacts: [contactId],
  };

  return await hubspotService.createDeal(deal);
}