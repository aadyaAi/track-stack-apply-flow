
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Contact } from '@/types';
import { Plus, Trash2, LinkedIn } from 'lucide-react';

interface ContactsSectionProps {
  contacts: Contact[];
  onAddContact: (contact: Omit<Contact, 'id'>) => void;
  onDeleteContact: (contactId: string) => void;
  onUpdateContact: (contact: Contact) => void;
}

export const ContactsSection: React.FC<ContactsSectionProps> = ({
  contacts,
  onAddContact,
  onDeleteContact,
  onUpdateContact,
}) => {
  const [newContact, setNewContact] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    linkedIn: '',
    notes: ''
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.role) {
      onAddContact({
        ...newContact,
        lastContactDate: new Date().toISOString()
      });
      setNewContact({
        name: '',
        role: '',
        email: '',
        phone: '',
        linkedIn: '',
        notes: ''
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Contacts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Name"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            />
            <Input
              placeholder="Role"
              value={newContact.role}
              onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
            />
            <Input
              placeholder="Email"
              type="email"
              value={newContact.email}
              onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
            />
            <Input
              placeholder="Phone"
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            />
            <Input
              placeholder="LinkedIn URL"
              value={newContact.linkedIn}
              onChange={(e) => setNewContact({ ...newContact, linkedIn: e.target.value })}
            />
          </div>
          <Button onClick={handleAddContact} className="w-full">
            <Plus className="w-4 h-4 mr-2" /> Add Contact
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex items-start justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <h4 className="font-medium">{contact.name}</h4>
                <p className="text-sm text-muted-foreground">{contact.role}</p>
                {contact.email && (
                  <p className="text-sm">
                    <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                      {contact.email}
                    </a>
                  </p>
                )}
                {contact.linkedIn && (
                  <a
                    href={contact.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-blue-600 hover:underline"
                  >
                    <LinkedIn className="w-4 h-4 mr-1" /> LinkedIn Profile
                  </a>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteContact(contact.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactsSection;
