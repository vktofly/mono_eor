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
  message?: string;
  lead_source?: string;
  lead_status?: string;
}

interface HubSpotDeal {
  dealname: string;
  amount?: string;
  dealstage?: string;
  pipeline?: string;
  closedate?: string;
  hubspot_owner_id?: string;
}

export class HubSpotService {
  private accessToken: string;
  private portalId: string;
  private baseUrl = 'https://api.hubapi.com';

  constructor() {
    const config = getHubSpotConfig();
    this.accessToken = config.accessToken || '';
    this.portalId = config.portalId || '';
  }

  private async makeRequest(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' = 'GET', data?: any) {
    if (!this.accessToken) {
      throw new Error('HubSpot access token not configured');
    }

    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HubSpot API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  async createContact(contact: HubSpotContact) {
    const properties = {
      email: contact.email,
      firstname: contact.firstname,
      lastname: contact.lastname,
      company: contact.company,
      phone: contact.phone,
      website: contact.website,
      jobtitle: contact.jobtitle,
      industry: contact.industry,
      message: contact.message,
      lead_source: contact.lead_source || 'Website',
      lead_status: contact.lead_status || 'New',
    };

    return this.makeRequest('/crm/v3/objects/contacts', 'POST', { properties });
  }

  async updateContact(contactId: string, properties: Partial<HubSpotContact>) {
    return this.makeRequest(`/crm/v3/objects/contacts/${contactId}`, 'PATCH', { properties });
  }

  async getContactByEmail(email: string) {
    const response = await this.makeRequest(`/crm/v3/objects/contacts/${email}?idProperty=email`);
    return response;
  }

  async createDeal(deal: HubSpotDeal, associatedContactId?: string) {
    const dealData = {
      properties: {
        dealname: deal.dealname,
        amount: deal.amount,
        dealstage: deal.dealstage || 'appointmentscheduled',
        pipeline: deal.pipeline || 'default',
        closedate: deal.closedate,
        hubspot_owner_id: deal.hubspot_owner_id,
      },
    };

    const createdDeal = await this.makeRequest('/crm/v3/objects/deals', 'POST', dealData);

    // Associate deal with contact if provided
    if (associatedContactId && createdDeal.id) {
      await this.associateDealWithContact(createdDeal.id, associatedContactId);
    }

    return createdDeal;
  }

  async associateDealWithContact(dealId: string, contactId: string) {
    const associationData = {
      inputs: [{
        from: { id: dealId },
        to: { id: contactId },
        type: 'deal_to_contact'
      }]
    };

    return this.makeRequest('/crm/v4/objects/deals/associations/create-batch', 'POST', associationData);
  }

  async createOrUpdateContact(contact: HubSpotContact) {
    try {
      // Try to get existing contact
      const existingContact = await this.getContactByEmail(contact.email);
      if (existingContact) {
        // Update existing contact
        return this.updateContact(existingContact.id, contact);
      }
    } catch (error) {
      // Contact doesn't exist, create new one
    }

    // Create new contact
    return this.createContact(contact);
  }

  async logFormSubmission(formData: any, formName: string) {
    const contact = {
      email: formData.email,
      firstname: formData.firstName || formData.firstname,
      lastname: formData.lastName || formData.lastname,
      company: formData.company,
      phone: formData.phone,
      message: formData.message,
      lead_source: 'Website',
      lead_status: 'New',
      hs_lead_status: 'New',
      form_submission: formName,
      submission_date: new Date().toISOString(),
    };

    const createdContact = await this.createOrUpdateContact(contact);

    // Create a deal for qualified leads
    if (formData.interest && ['quote', 'demo', 'enterprise'].includes(formData.interest)) {
      const dealName = `${formData.company || 'Unknown Company'} - ${formName}`;
      await this.createDeal({
        dealname: dealName,
        dealstage: 'appointmentscheduled',
        amount: formData.estimatedValue || '10000',
      }, createdContact.id);
    }

    return createdContact;
  }
}

export const hubspotService = new HubSpotService();
