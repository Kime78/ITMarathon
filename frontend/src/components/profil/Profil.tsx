import React, { useState, useEffect, useRef } from "react";
import type { UserSettings } from "@/types/userSettings"; // Asigură-te că ai acest tip definit

function Profile() {
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedSettings, setEditedSettings] = useState<UserSettings | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null); // Referință la input-ul de tip file

  const fontOptions = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Courier New",
    "Georgia",
  ]; // Opțiuni de font

  useEffect(() => {
    const fetchUserSettings = async () => {
      setLoading(true);
      setError(null);
      if (typeof window !== "undefined") {
        const localUser = localStorage.getItem("user");
        if (localUser) {
          try {
            const userObj = JSON.parse(localUser);
            const userId = userObj.id;
            if (!userId) {
              throw new Error("User ID not found in localStorage");
            }

            const response = await fetch(
              `http://localhost:3000/api/userSettings/${userId}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (!response.ok) {
              throw new Error(
                `Failed to fetch user settings: ${response.status}`
              );
            }

            const data = (await response.json()) as UserSettings;
            setUserSettings(data);
            setEditedSettings({ ...data });
          } catch (err: any) {
            setError(err.message);
            setUserSettings(null);
          } finally {
            setLoading(false);
          }
        } else {
          setError("Nu ești autentificat.");
          setLoading(false);
        }
      } else {
        setError(
          "Funcția fetch WUserSettings trebuie apelată pe partea clientului."
        );
        setLoading(false);
      }
    };

    fetchUserSettings();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedSettings({ ...userSettings });
  };

  const handleSaveClick = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!editedSettings) {
        throw new Error("No settings to save.");
      }
      const response = await fetch("http://localhost:3000/api/userSettings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedSettings),
      });

      if (!response.ok) {
        throw new Error(`Failed to save user settings: ${response.status}`);
      }

      const data = (await response.json()) as UserSettings;
      setUserSettings(data);
      setEditedSettings({ ...data });
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedSettings) {
      setEditedSettings({
        ...editedSettings,
        [name]: value,
      });
    }
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedSettings) {
      setEditedSettings({
        ...editedSettings,
        [name]: parseInt(value, 10),
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editedSettings) {
      // Handle file upload logic here (e.g., store in state, upload to server)
      // For simplicity, we'll just store the file name for now
      setEditedSettings({
        ...editedSettings,
        profilePicUrl: file.name, // Or handle the uploaded file URL/path
      });
    }
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (editedSettings) {
      setEditedSettings({
        ...editedSettings,
        font: value,
      });
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (editedSettings) {
      setEditedSettings({
        ...editedSettings,
        profileColor: value,
      });
    }
  };

  if (loading) return <p>Se încarcă profilul...</p>;
  if (error) return <p>Eroare: {error}</p>;
  if (!userSettings) return <p>Nu sunt disponibile setările utilizatorului.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Profilul meu</h1>

      {isEditing ? (
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Rol:
            </label>
            <input
              type="text"
              name="role"
              value={editedSettings.role}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Poză Profil:
            </label>
            <input
              type="file"
              name="profilePicUrl"
              onChange={handleFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ref={fileInputRef}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Culoare Profil:
            </label>
            <input
              type="color"
              name="profileColor"
              value={editedSettings.profileColor}
              onChange={handleColorChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mărime Font:
            </label>
            <input
              type="number"
              name="fontSize"
              value={editedSettings.fontSize?.toString()}
              onChange={handleNumberInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Font:
            </label>
            <select
              name="font"
              value={editedSettings.font}
              onChange={handleFontChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ fontFamily: editedSettings.font }} // Apply font style
            >
              {fontOptions.map((font) => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSaveClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          >
            Salvează
          </button>
          <button
            onClick={handleCancelClick}
            className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Anulează
          </button>
        </div>
      ) : (
        <div>
          {userSettings.profilePicUrl && (
            <div className="mb-4">
              <img
                src={userSettings.profilePicUrl}
                alt="Poza de profil"
                className="rounded-full w-32 h-32 object-cover shadow-md"
              />
            </div>
          )}
          <div className="mb-2">
            <strong>Rol:</strong> {userSettings.role}
          </div>
          <div className="mb-2">
            <strong>Culoare Profil:</strong> {userSettings.profileColor}
          </div>
          <div className="mb-2">
            <strong>Mărime Font:</strong> {userSettings.fontSize}
          </div>
          <div className="mb-2" style={{ fontFamily: userSettings.font }}>
            {/* Apply font style */}
            <strong>Font:</strong> {userSettings.font}
          </div>
          <button
            onClick={handleEditClick}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Editează
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
