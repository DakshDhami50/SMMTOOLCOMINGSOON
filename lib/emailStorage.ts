// Simple email storage utility
interface EmailData {
  id: string;
  name: string;
  email: string;
  company?: string;
  timestamp: number;
}

class EmailStorage {
  private storageKey = 'zenithly_emails';
  private emails: EmailData[] = [];

  constructor() {
    this.loadEmails();
  }

  private loadEmails() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.emails = JSON.parse(stored);
      }
    }
  }

  private saveEmails() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(this.emails));
    }
  }

  addEmail(data: Omit<EmailData, 'id' | 'timestamp'>) {
    const emailData: EmailData = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      ...data
    };
    
    this.emails.push(emailData);
    this.saveEmails();
    return emailData;
  }

  getAllEmails(): EmailData[] {
    return [...this.emails];
  }

  getEmailCount(): number {
    return this.emails.length;
  }

  getRecentEmails(count: number = 5): EmailData[] {
    return this.emails
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, count);
  }

  clearEmails() {
    this.emails = [];
    this.saveEmails();
  }
}

export const emailStorage = new EmailStorage();
export type { EmailData };
