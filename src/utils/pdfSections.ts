import type { jsPDF } from 'jspdf';
import type { EstimationData, RoomDetails } from '../types';
import { UserOptions } from 'jspdf-autotable';
import { calculateRoomTotal } from './calculations';
import { MATERIAL_SPECIFICATIONS } from './materialSpecs';

export function addHeader(doc: jsPDF): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Estimation Amount", doc.internal.pageSize.width / 2, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Bhavya Interior's", 10, 30);
  doc.text("Contact: 9948806670 | 7032273451", 10, 35);
  
  doc.line(10, 40, 200, 40);
  
  return 45;
}

export function addCompanyDetails(doc: jsPDF, data: EstimationData, startY: number): number {
  const companyDetails = Object.entries(data.companyDetails)
    .filter(([_, value]) => value.trim() !== '')
    .map(([key, value]) => [
      key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
      value
    ]);

  if (companyDetails.length === 0) return startY;

  doc.setFontSize(14);
  doc.text('Company Details', 14, startY);

  const tableOptions: UserOptions = {
    startY: startY + 5,
    head: [],
    body: companyDetails,
    theme: 'plain',
    styles: { fontSize: 10 },
  };

  return (doc as any).autoTable(tableOptions).previousAutoTable.finalY;
}

export function addUserDetails(doc: jsPDF, data: EstimationData, startY: number): number {
  const userDetails = Object.entries(data.userDetails)
    .filter(([_, value]) => value.trim() !== '')
    .map(([key, value]) => [
      key === 'flatNumber' ? 'Flat Number' : 
        key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
      value
    ]);

  if (userDetails.length === 0) return startY;

  doc.setFontSize(14);
  doc.text('Customer Details', 14, startY);

  const tableOptions: UserOptions = {
    startY: startY + 5,
    head: [],
    body: userDetails,
    theme: 'plain',
    styles: { fontSize: 10 },
  };

  return (doc as any).autoTable(tableOptions).previousAutoTable.finalY;
}

export function addPriceSettings(doc: jsPDF, data: EstimationData, startY: number): number {
  doc.setFontSize(14);
  doc.text('Price Settings', 14, startY);

  const tableOptions: UserOptions = {
    startY: startY + 5,
    head: [],
    body: [
      ['Box Price (per SqFt)', `${data.priceSettings.boxPrice}`],
      ['Frame Price (per SqFt)', `${data.priceSettings.framePrice}`],
      ['Work Type', data.priceSettings.workType],
    ],
    theme: 'plain',
    styles: { fontSize: 10 },
  };

  return (doc as any).autoTable(tableOptions).previousAutoTable.finalY;
}

export function addRoomDetails(doc: jsPDF, room: RoomDetails, startY: number): number {
  const pageHeight = doc.internal.pageSize.height;
  const margin = 40;

  if (startY > pageHeight - margin) {
    doc.addPage();
    startY = 20;
  }

  doc.setFontSize(14);
  doc.text(`${room.type || 'Room'} Details`, 14, startY);

  const tableBody = room.items.map((item, index) => [
    (index + 1).toString(),
    item.type,
    item.length.toString(),
    item.breadth.toString(),
    item.totalLength.toFixed(2),
    `${item.totalPrice.toFixed(2)}`,
  ]);

  const tableOptions: UserOptions = {
    startY: startY + 5,
    head: [['#', 'Type', 'Length', 'Breadth', 'Total Length', 'Total Price']],
    body: tableBody,
    theme: 'striped',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [71, 85, 105] },
    didDrawPage: (data) => {
      if (data.cursor?.y === data.settings.margin.top) {
        doc.setFontSize(14);
        doc.text(`${room.type || 'Room'} Details (Continued)`, 14, 20);
      }
    },
  };

  const finalY = (doc as any).autoTable(tableOptions).previousAutoTable.finalY;
  const roomTotal = calculateRoomTotal(room);

  const totalTableOptions: UserOptions = {
    startY: finalY + 2,
    body: [[
      { content: 'Room Total:', styles: { fontStyle: 'bold' } },
      { content: `${roomTotal.toFixed(2)}`, styles: { fontStyle: 'bold' } }
    ]],
    theme: 'plain',
    styles: { fontSize: 10 },
  };

  return (doc as any).autoTable(totalTableOptions).previousAutoTable.finalY;
}

export function addMaterialSpecifications(doc: jsPDF, startY: number): number {
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Material Specifications", 10, startY);

  let currentY = startY + 10;
  const lineHeight = 5;

  Object.entries(MATERIAL_SPECIFICATIONS).forEach(([_, spec], index) => {
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`${index + 1}. ${spec.title}:`, 10, currentY);
    currentY += lineHeight;

    spec.details.forEach(detail => {
      doc.text(`   - ${detail}`, 15, currentY);
      currentY += lineHeight;
    });

    currentY += lineHeight; // Add space between sections
  });

  return currentY;
}

export function addFooter(doc: jsPDF): void {
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text(
    "© 2024 Bhavya Interior's. All rights reserved.",
    10,
    doc.internal.pageSize.height - 10
  );
}

export function addGrandTotal(doc: jsPDF, data: EstimationData, startY: number): number {
  const grandTotal = data.rooms.reduce(
    (sum, room) => sum + calculateRoomTotal(room),
    0
  );

  const tableOptions: UserOptions = {
    startY: startY + 10,
    body: [[
      { content: 'Grand Total:', styles: { fontStyle: 'bold' } },
      { content: `${grandTotal.toFixed(2)}`, styles: { fontStyle: 'bold' } }
    ]],
    theme: 'plain',
    styles: { fontSize: 12 },
  };

  return (doc as any).autoTable(tableOptions).previousAutoTable.finalY;
}