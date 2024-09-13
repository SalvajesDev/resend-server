"use client";

import React, { useState, useEffect } from "react";

export default function HomePage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("/api/getContacts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setContacts(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError(err.message || "An error occurred while fetching contacts");
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>
      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul className="space-y-2">
          {contacts.map((contact, index) => (
            <li key={contact.id || index} className="border p-2 rounded">
              <p>
                <strong>Email:</strong> {contact.email}
              </p>
              <p>
                <strong>First Name:</strong> {contact.first_name || "N/A"}
              </p>
              <p>
                <strong>Last Name:</strong> {contact.last_name || "N/A"}
              </p>
              <p>
                <strong>Unsubcribed:</strong> {contact.unsubscribed || "N/A"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
