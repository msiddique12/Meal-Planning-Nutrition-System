const API_URL = 'http://localhost:5001/api';

export const api = {
  async queryTable(table) {
    const response = await fetch(`${API_URL}/${table.toLowerCase()}`);
    if (!response.ok) {
      throw new Error(`Failed to query ${table}`);
    }
    return response.json();
  },

  async insertIntoTable(table, data) {
    const response = await fetch(`${API_URL}/${table.toLowerCase()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to insert into ${table}`);
    }
    return response.json();
  },

  async deleteFromTable(table, id) {
    const response = await fetch(`${API_URL}/${table.toLowerCase()}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete from ${table}`);
    }
    return response.json();
  },

  async updateTable(table, data) {
    const response = await fetch(`${API_URL}/${table.toLowerCase()}/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to update ${table}`);
    }
    return response.json();
  },

  async specialQuery(queryType) {
    const response = await fetch(`${API_URL}/special/${queryType}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw { response: { data: errorData } };
    }
    return response.json();
  }
};
