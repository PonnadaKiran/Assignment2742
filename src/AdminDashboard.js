import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

import Table from './Table';
import Pagination from './Pagination';
import Search from './Search';
import Delete from './Delete';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    name: '',
    email: '',
    role: '',
  });
  const [originalUsers, setOriginalUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const apiUrl = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const mappedData = data.map((user) => ({ ...user, isSelected: false }));
      setUsers(mappedData);
      setOriginalUsers(mappedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
  
  const renderTable = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const displayUsers = users.slice(startIndex, endIndex);
  
    return (
      <table className="w-full border-collapse border border-gray-300 mt-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2">
              <input type="checkbox" onChange={selectAllRows} />
            </th>
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Role</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {displayUsers.map((user, index) => (
            <React.Fragment key={user.id}>
              <tr className={user.isSelected ? 'bg-gray-300 ' : ''}>
                <td className="py-2 w-16">
                  <input
                    type="checkbox"
                    checked={user.isSelected}
                    onChange={() => toggleSelect(user.id)}
                  />
                </td>
                <td className="py-2 w-16">{user.id}</td>
                <td className="py-2 w-100">
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      value={editedUserData.name}
                      onChange={(e) =>
                        setEditedUserData({ ...editedUserData, name: e.target.value })
                      }
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="py-2 w-100">
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      value={editedUserData.email}
                      onChange={(e) =>
                        setEditedUserData({ ...editedUserData, email: e.target.value })
                      }
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="py-2 w-100">
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      value={editedUserData.role}
                      onChange={(e) =>
                        setEditedUserData({ ...editedUserData, role: e.target.value })
                      }
                    />
                  ) : (
                    user.role
                  )}
                </td>
                <td className="py-2">
                  {editingUserId === user.id ? (
                    <div className="flex items-center">
                      <button
                        className="bg-green-500 text-white py-1 px-2 mr-2 rounded-md"
                        onClick={() => saveUser(user.id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 text-white py-1 px-2 rounded-md"
                        onClick={() => cancelEdit()}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        className="bg-blue-500 text-white py-1 px-2 mr-2 rounded-md"
                        onClick={() => editUser(user.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-2 rounded-md"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
              {index < displayUsers.length - 1 && (
                <tr>
                  <td colSpan="6" className="border-b"></td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    );
  };

  const updatePagination = useCallback(() => {
    setTotalPages(Math.ceil(users.length / 10));
  }, [users]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const search = () => {
    if (searchTerm.trim() === '') {
      setUsers(originalUsers);
    } else {
      const filteredUsers = originalUsers
        .map((user) => ({ ...user, isSelected: false }))
        .filter((user) => {
          for (const key in user) {
            if (
              typeof user[key] === 'string' &&
              user[key].toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return true;
            }
          }
          return false;
        });

      setUsers(filteredUsers);
      setCurrentPage(1);
    }
  };

  const editUser = (userId) => {
    setEditingUserId(userId);
    const userToEdit = users.find((user) => user.id === userId);
    setEditedUserData({
      name: userToEdit.name,
      email: userToEdit.email,
      role: userToEdit.role,
    });
  };

  const saveUser = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? {
            ...user,
            name: editedUserData.name,
            email: editedUserData.email,
            role: editedUserData.role,
          }
        : user
    );
    setUsers(updatedUsers);
    setEditingUserId(null);
  };

  const cancelEdit = () => {
    setEditingUserId(null);
    setEditedUserData({
      name: '',
      email: '',
      role: '',
    });
  };

  const deleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const toggleSelect = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, isSelected: !user.isSelected } : user
    );
    setUsers(updatedUsers);
  };

  const selectAllRows = () => {
    const updatedUsers = users.map((user) => ({ ...user, isSelected: !user.isSelected }));
    setUsers(updatedUsers);
  };

  const deleteSelected = () => {
    const updatedUsers = users.filter((user) => !user.isSelected);
    setUsers(updatedUsers);
  };

  useEffect(() => {
    updatePagination();
  }, [users, currentPage,updatePagination]);


  return (
    <div className="container mx-auto p-4">
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} search={search} />
      <Table
        renderTable={renderTable}
      />
      <Pagination goToPage={goToPage} currentPage={currentPage} totalPages={totalPages} />
      <Delete deleteSelected={deleteSelected} />
    </div>
  );

};

export default AdminDashboard;
