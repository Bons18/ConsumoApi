import React, { useState, useEffect } from 'react';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({ name: '', email: '' });
  const [editClientId, setEditClientId] = useState(null);
  const [updatedClient, setUpdatedClient] = useState({ name: '', email: '' });

  const baseUrl = 'https://bank-api-ukci.onrender.com/clients'; // URL base de la API

  // Fetch para obtener todos los clientes
  const fetchClients = async () => {
    try {
      const response = await fetch(baseUrl);
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  };

  // Crear un cliente
  const createClient = async () => {
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClient),
      });
      if (response.ok) {
        fetchClients(); // Actualizar la lista de clientes
        setNewClient({ name: '', email: '' });
      }
    } catch (error) {
      console.error('Error al crear cliente:', error);
    }
  };

  // Actualizar un cliente
  const updateClient = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedClient),
      });
      if (response.ok) {
        fetchClients(); // Actualizar la lista de clientes
        setEditClientId(null);
        setUpdatedClient({ name: '', email: '' });
      }
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
    }
  };

  // Eliminar un cliente
  const deleteClient = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchClients(); // Actualizar la lista de clientes
      }
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  };

  useEffect(() => {
    fetchClients(); // Cargar clientes cuando el componente se monta
  }, []);

  return (
    <div>
      <h1>Gestión de Clientes</h1>

      <h2>Agregar Cliente</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={newClient.name}
        onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newClient.email}
        onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
      />
      <button onClick={createClient}>Agregar</button>

      <h2>Lista de Clientes</h2>
      <ul>
        {clients.map((client) => (
          <li key={client._id}>
            {editClientId === client._id ? (
              <>
                <input
                  type="text"
                  value={updatedClient.name}
                  onChange={(e) => setUpdatedClient({ ...updatedClient, name: e.target.value })}
                />
                <input
                  type="email"
                  value={updatedClient.email}
                  onChange={(e) => setUpdatedClient({ ...updatedClient, email: e.target.value })}
                />
                <button onClick={() => updateClient(client._id)}>Guardar</button>
                <button onClick={() => setEditClientId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <span>{client.name} - {client.email}</span>
                <button onClick={() => {
                  setEditClientId(client._id);
                  setUpdatedClient({ name: client.name, email: client.email });
                }}>Editar</button>
                <button onClick={() => deleteClient(client._id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clients;
