import React, { useState, useEffect, useRef } from "react";
import type { UserSettings } from "@/types/userSettings";

function Profile() {
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedSettings, setEditedSettings] = useState<UserSettings | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fontOptions = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Courier New",
    "Georgia",
  ];

  useEffect(() => {
    const fetchUserSettings = async () => {
      setLoading(true);
      setError(null);
      try {
        const localUser = localStorage.getItem("user");
        if (!localUser) throw new Error("Nu ești autentificat.");

        const userObj = JSON.parse(localUser);
        const userId = userObj.id;
        if (!userId) throw new Error("User ID not found");

        const response = await fetch(
          `http://localhost:3000/api/userSettings/${userId}`
        );
        if (!response.ok)
          throw new Error(`Failed to fetch user settings: ${response.status}`);

        const data = (await response.json()) as UserSettings;
        setUserSettings(data);
        setEditedSettings({ ...data });
      } catch (err: any) {
        setError(err.message || "Eroare la încărcarea setărilor.");
        setUserSettings(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSettings();
  }, []);

  // Handlers edit/save/cancel

  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedSettings(userSettings ? { ...userSettings } : null);
  };

  const handleSaveClick = async () => {
    if (!editedSettings) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/userSettings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedSettings),
      });
      if (!response.ok)
        throw new Error(`Failed to save settings: ${response.status}`);

      const data = (await response.json()) as UserSettings;
      setUserSettings(data);
      setEditedSettings({ ...data });
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || "Eroare la salvare.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (!editedSettings) return;
    setEditedSettings({
      ...editedSettings,
      [name]: value,
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!editedSettings) return;
    setEditedSettings({
      ...editedSettings,
      [name]: parseInt(value, 10) || 0,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editedSettings) {
      // Pentru demo, doar numele fișierului; ideal: upload server + URL
      setEditedSettings({
        ...editedSettings,
        profilePicUrl: URL.createObjectURL(file), // vezi mai jos
      });
    }
  };

  if (loading) return <p>Se încarcă profilul...</p>;
  if (error) return <p className="text-red-600">Eroare: {error}</p>;
  if (!userSettings) return <p>Nu sunt disponibile setările utilizatorului.</p>;

  return (
    <div
      className="p-4"
      style={{ backgroundColor: userSettings.backgroundColor || "#fff" }}
    >
      <h1 className="text-2xl font-bold mb-6">Profilul meu</h1>

      {isEditing ? (
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block font-semibold mb-1">Nume</label>
            <input
              type="text"
              name="name"
              value={editedSettings.name || ""}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={editedSettings.email || ""}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Poză profil</label>
            <input
              type="file"
              accept="image/*"
              name="profilePicUrl"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="w-full"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Culoare fundal</label>
            <input
              type="color"
              name="backgroundColor"
              value={editedSettings.backgroundColor || "#ffffff"}
              onChange={handleInputChange}
              className="w-16 h-10 p-0 border rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Culoare profil</label>
            <input
              type="color"
              name="profileColor"
              value={editedSettings.profileColor || "#000000"}
              onChange={handleInputChange}
              className="w-16 h-10 p-0 border rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Font</label>
            <select
              name="font"
              value={editedSettings.font || fontOptions[0]}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              style={{ fontFamily: editedSettings.font || fontOptions[0] }}
            >
              {fontOptions.map((font) => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Mărime font</label>
            <input
              type="number"
              name="fontSize"
              value={editedSettings.fontSize || 14}
              onChange={handleNumberChange}
              className="w-full border rounded px-3 py-2"
              min={8}
              max={72}
            />
          </div>

          <div className="flex space-x-2 mt-4">
            <button
              onClick={handleSaveClick}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Salvează
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Anulează
            </button>
          </div>
        </div>
      ) : (
        <div
          className="max-w-md space-y-4"
          style={{
            fontFamily: userSettings.font,
            fontSize: userSettings.fontSize,
            backgroundColor: userSettings.backgroundColor || "#fff",
            color: userSettings.profileColor || "#000",
          }}
        >
          {userSettings.profilePicUrl && (
            <img
              src={userSettings.profilePicUrl}
              alt="Poza profil"
              className="w-32 h-32 rounded-full object-cover shadow-md mb-4"
            />
          )}

          <p>
            <strong>Nume:</strong> {userSettings.name}
          </p>
          <p>
            <strong>Email:</strong> {userSettings.email}
          </p>
          <p>
            <strong>Culoare profil:</strong>{" "}
            <span
              style={{
                backgroundColor: userSettings.profileColor,
                display: "inline-block",
                width: 20,
                height: 20,
                borderRadius: 4,
              }}
            ></span>
          </p>
          <p>
            <strong>Culoare fundal:</strong>{" "}
            <span
              style={{
                backgroundColor: userSettings.backgroundColor,
                display: "inline-block",
                width: 20,
                height: 20,
                borderRadius: 4,
              }}
            ></span>
          </p>
          <p>
            <strong>Font:</strong> {userSettings.font}
          </p>
          <p>
            <strong>Mărime font:</strong> {userSettings.fontSize}px
          </p>

          <button
            onClick={handleEditClick}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Editează
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
