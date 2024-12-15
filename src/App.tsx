import { useState } from 'react';
// import { CompanyDetailsForm } from './components/CompanyDetailsForm';
// import { UserDetailsForm } from './components/UserDetailsForm';
import { PriceSettings } from './components/PriceSettings';
import { RoomDetails } from './components/RoomDetails';
import { generatePDF } from './utils/pdfGenerator';
import { FileDown, PlusCircle } from 'lucide-react';
// import type { EstimationData, UserDetails, CompanyDetails, PriceSettings as PriceSettingsType, RoomDetails as RoomDetailsType } from './types';
import type { EstimationData, PriceSettings as PriceSettingsType, RoomDetails as RoomDetailsType } from './types';

function App() {
  const [data, setData] = useState<EstimationData>({
    companyDetails: {
      name: '',
      mobile: '',
      email: '',
      location: '',
    },
    userDetails: {
      name: '',
      address: '',
      mobile: '',
      flatNumber: '',
      email: '',
    },
    priceSettings: {
      boxPrice: 0,
      framePrice: 0,
      workType: '',
    },
    rooms: [],
  });

  const addRoom = () => {
    const newRoom: RoomDetailsType = {
      id: crypto.randomUUID(),
      type: '',
      items: [],
    };
    console.log(newRoom.id);
    
    setData({ ...data, rooms: [...data.rooms, newRoom] });
  };

  const updateRoom = (roomId: string, updatedRoom: RoomDetailsType) => {
    setData({
      ...data,
      rooms: data.rooms.map((room) => (room.id === roomId ? updatedRoom : room)),
    });
  };

  const deleteRoom = (roomId: string) => {
    setData({
      ...data,
      rooms: data.rooms.filter((room) => room.id !== roomId),
    });
  };

  const handleGeneratePDF = () => {
    console.log(data);
    
    const doc = generatePDF(data);
    doc.save('interior-cost-estimation.pdf');
  };

  return (
    <div className="min-h-screen bg-primary-light p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Estimation Amount</h1>
          <button onClick={handleGeneratePDF} className="btn-primary flex items-center">
            <FileDown className="w-5 h-5 mr-2" />
            Generate PDF
          </button>
        </div>
{/* 
        <CompanyDetailsForm
          companyDetails={data.companyDetails}
          onChange={(details: CompanyDetails) => setData({ ...data, companyDetails: details })}
        />

        <UserDetailsForm
          userDetails={data.userDetails}
          onChange={(details: UserDetails) => setData({ ...data, userDetails: details })}
        /> */}

        <PriceSettings
          settings={data.priceSettings}
          onChange={(settings: PriceSettingsType) => setData({ ...data, priceSettings: settings })}
        />

        {data.rooms.map((room) => (
          <RoomDetails
            key={room.id}
            room={room}
            onUpdate={(updatedRoom) => updateRoom(room.id, updatedRoom)}
            onDelete={() => deleteRoom(room.id)}
            boxPrice={data.priceSettings.boxPrice}
            framePrice={data.priceSettings.framePrice}
          />
        ))}

        <button onClick={addRoom} className="btn-success flex items-center mt-6">
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Room
        </button>
      </div>
    </div>
  );
}

export default App;