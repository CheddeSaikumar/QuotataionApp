import type { jsPDF } from 'jspdf';
import type { EstimationData, RoomDetails, BasketItem } from '../types';
import { UserOptions } from 'jspdf-autotable';
import { calculateRoomTotal } from './calculations';
import { MATERIAL_SPECIFICATIONS } from './materialSpecs';

const SECTION_SPACING = 10;

export function addHeader(doc: jsPDF, data: EstimationData): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Estimation Amount", doc.internal.pageSize.width / 2, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(data.companyDetails.name || "Interior Contractors & Designers", 10, 30);
  const mobileNumbers = doc.splitTextToSize(
    "Contact: " + data.companyDetails.mobileNumbers.filter(n => n.trim()).join(" | "),
    180
  );
  doc.text(mobileNumbers, 10, 35);
  
  doc.line(10, 40, 200, 40);
  
  return 45;
}

export function addCompanyDetails(doc: jsPDF, data: EstimationData, startY: number): number {
  const { name, email, location } = data.companyDetails;
  const companyDetails = [
    ['Company Name', name],
    ['Email', email],
    ['Location', location],
  ].filter(([_, value]) => value.trim() !== '');

  if (companyDetails.length === 0) return startY;

  if (startY > doc.internal.pageSize.height - 100) {
    doc.addPage();
    startY = 20;
  }

  doc.setFontSize(14);
  doc.text('Company Details', 14, startY);

  const tableOptions: UserOptions = {
    startY: startY + 5,
    head: [],
    body: companyDetails,
    theme: 'plain',
    styles: { fontSize: 10 },
    margin: { bottom: SECTION_SPACING }
  };

  return (doc as any).autoTable(tableOptions).previousAutoTable.finalY;
}

export function addUserDetails(doc: jsPDF, data: EstimationData, startY: number): number {
  const userDetails = [
    ['Name', data.userDetails.name],
    ['Mobile', data.userDetails.mobile],
    ['Email', data.userDetails.email],
    ['Flat Number', data.userDetails.flatNumber],
    ['Address', data.userDetails.address],
  ].filter(([_, value]) => value.trim() !== '');

  if (userDetails.length === 0) return startY;

  if (startY > doc.internal.pageSize.height - 100) {
    doc.addPage();
    startY = 20;
  }

  doc.setFontSize(14);
  doc.text('Customer Details', 14, startY);

  const tableOptions: UserOptions = {
    startY: startY + 5,
    head: [],
    body: userDetails,
    theme: 'plain',
    styles: { fontSize: 10 },
    margin: { bottom: SECTION_SPACING }
  };

  return (doc as any).autoTable(tableOptions).previousAutoTable.finalY;
}

export function addPriceSettings(doc: jsPDF, data: EstimationData, startY: number): number {
  if (startY > doc.internal.pageSize.height - 100) {
    doc.addPage();
    startY = 20;
  }

  doc.setFontSize(14);
  doc.text('Price Settings', 14, startY);

  const tableOptions: UserOptions = {
    startY: startY + 5,
    head: [],
    body: [
      ['Box Price (per unit)', `${data.priceSettings.boxPrice}`],
      ['Frame Price (per unit)', `${data.priceSettings.framePrice}`],
      ['Work Type', data.priceSettings.workType],
    ],
    theme: 'plain',
    styles: { fontSize: 10 },
    margin: { bottom: SECTION_SPACING }
  };

  return (doc as any).autoTable(tableOptions).previousAutoTable.finalY;
}

export function addRoomDetails(doc: jsPDF, room: RoomDetails, startY: number): number {
  if (startY > doc.internal.pageSize.height - 100) {
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
    headStyles: { fillColor: [51, 51, 51] },
    margin: { bottom: SECTION_SPACING }
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
    margin: { bottom: SECTION_SPACING }
  };

  return (doc as any).autoTable(tableOptions).previousAutoTable.finalY;
}

export function addBasketItems(doc: jsPDF, items: BasketItem[], startY: number): number {
  if (items.length === 0) return startY;

  if (startY > doc.internal.pageSize.height - 100) {
    doc.addPage();
    startY = 20;
  }

  doc.setFontSize(14);
  doc.text('Additional Items', 14, startY);

  const tableBody = items.map((item, index) => [
    (index + 1).toString(),
    item.name,
    item.quantity.toString(),
    `${item.price.toFixed(2)}`,
    `${(item.quantity * item.price).toFixed(2)}`,
  ]);

  const tableOptions: UserOptions = {
    startY: startY + 5,
    head: [['#', 'Item Name', 'Quantity', 'Price', 'Total']],
    body: tableBody,
    theme: 'striped',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [51, 51, 51] },
    margin: { bottom: SECTION_SPACING }
  };

  const finalY = (doc as any).autoTable(tableOptions).previousAutoTable.finalY;
  const basketTotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  const totalTableOptions: UserOptions = {
    startY: finalY + 2,
    body: [[
      { content: 'Additional Items Total:', styles: { fontStyle: 'bold' } },
      { content: `${basketTotal.toFixed(2)}`, styles: { fontStyle: 'bold' } }
    ]],
    theme: 'plain',
    styles: { fontSize: 10 },
    margin: { bottom: SECTION_SPACING }
  };

  return (doc as any).autoTable(tableOptions).previousAutoTable.finalY;
}

export function addMaterialSpecifications(doc: jsPDF, startY: number): number {
  if (startY > doc.internal.pageSize.height - 100) {
    doc.addPage();
    startY = 20;
  }

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Material Specifications", doc.internal.pageSize.width / 2, startY, { align: 'center' });

  let currentY = startY + 10;
  const lineHeight = 7;

  Object.entries(MATERIAL_SPECIFICATIONS).forEach(([_, spec], index) => {
    if (currentY > doc.internal.pageSize.height - 50) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`${index + 1}. ${spec.title}`, 20, currentY);
    currentY += lineHeight;

    doc.setFont("helvetica", "normal");
    spec.details.forEach(detail => {
      if (currentY > doc.internal.pageSize.height - 20) {
        doc.addPage();
        currentY = 20;
      }
      doc.text(`• ${detail}`, 30, currentY);
      currentY += lineHeight;
    });

    currentY += 2;
  });

  return currentY;
}

export function addGrandTotal(doc: jsPDF, data: EstimationData, startY: number): number {
  if (startY > doc.internal.pageSize.height - 50) {
    doc.addPage();
    startY = 20;
  }

  const roomsTotal = data.rooms.reduce((sum, room) => sum + calculateRoomTotal(room), 0);
  const basketTotal = data.basketItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const grandTotal = roomsTotal + basketTotal;

  const tableOptions: UserOptions = {
    startY: startY + 5,
    body: [[
      { content: 'Grand Total:', styles: { fontStyle: 'bold', fontSize: 12 } },
      { content: `${grandTotal.toFixed(2)}`, styles: { fontStyle: 'bold', fontSize: 12 } }
    ]],
    theme: 'plain',
    styles: { fontSize: 12 }
  };

  return (doc as any).autoTable(tableOptions).previousAutoTable.finalY;
}

export function addFooter(doc: jsPDF, companyName: string): void {
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text(
    `© ${new Date().getFullYear()} ${companyName || 'Interior Contractors & Designers'}. All rights reserved.`,
    10,
    doc.internal.pageSize.height - 10
  );
}