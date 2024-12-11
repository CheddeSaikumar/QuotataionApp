import React, { useState } from 'react';
import { CompanyDetailsForm } from './components/CompanyDetailsForm';
import { UserDetailsForm } from './components/UserDetailsForm';
import { PriceSettings } from './components/PriceSettings';
import { RoomDetails } from './components/RoomDetails';
import { BasketItemsForm } from './components/BasketItemsForm';
import { generatePDF } from './utils/pdfGenerator';
import { Plus } from 'lucide-react';
import { PDFHeader } from './components/PDFHeader';
import { Section } from './components/Section';
import type { EstimationData, UserDetails, CompanyDetails, PriceSettings as PriceSettingsType, RoomDetails as RoomDetailsType, BasketItem } from './types';

function App() {
  const [pdfFilename, setPdfFilename] = useState('interior-cost-estimation');
  const [data, setData] = useState<EstimationData>({
    companyDetails: {
      name: '',
      mobileNumbers: [''],
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
    basketItems: [],
  });

  const addRoom = () => {
    const newRoom: RoomDetailsType = {
      id: crypto.randomUUID(),
      type: '',
      items: [],
    };
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
    const filename = pdfFilename.trim() || 'interior-cost-estimation';
    const doc = generatePDF(data);
    doc.save(`${filename}.pdf`);
  };

  return (
    <div className="min-h-screen bg-primary-light p-6 relative">
      <PDFHeader 
        filename={pdfFilename}
        onFilenameChange={setPdfFilename}
        onGenerate={handleGeneratePDF}
      />

      <div className="max-w-7xl mx-auto mt-20">
        <h1 className="text-3xl font-bold text-primary mb-6">Estimation Amount</h1>

        <Section title="Company Details" defaultOpen>
          <CompanyDetailsForm
            companyDetails={data.companyDetails}
            onChange={(details: CompanyDetails) => setData({ ...data, companyDetails: details })}
          />
        </Section>

        <Section title="Customer Details">
          <UserDetailsForm
            userDetails={data.userDetails}
            onChange={(details: UserDetails) => setData({ ...data, userDetails: details })}
          />
        </Section>

        <Section title="Price Settings">
          <PriceSettings
            settings={data.priceSettings}
            onChange={(settings: PriceSettingsType) => setData({ ...data, priceSettings: settings })}
          />
        </Section>

        <Section title="Rooms">
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
            <Plus className="w-5 h-5 mr-2" />
            Add Room
          </button>
        </Section>

        <Section title="Additional Items">
          <BasketItemsForm
            items={data.basketItems}
            onChange={(items: BasketItem[]) => setData({ ...data, basketItems: items })}
          />
        </Section>
      </div>
    </div>
  );
}

export default App;