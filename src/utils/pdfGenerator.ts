import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { EstimationData } from '../types';

export function generatePDF(data: EstimationData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // Title
  doc.setFontSize(20);
  doc.text('Estimation Amount', pageWidth / 2, 20, { align: 'center' });

  // Company Details
  doc.setFontSize(14);
  doc.text('Company Details', 14, 40);
  
  const companyDetails = [];
  if (data.companyDetails.name) companyDetails.push(['Company Name', data.companyDetails.name]);
  if (data.companyDetails.mobile) companyDetails.push(['Mobile', data.companyDetails.mobile]);
  if (data.companyDetails.email) companyDetails.push(['Email', data.companyDetails.email]);
  if (data.companyDetails.location) companyDetails.push(['Location', data.companyDetails.location]);

  if (companyDetails.length > 0) {
    autoTable(doc, {
      startY: 45,
      head: [],
      body: companyDetails,
      theme: 'plain',
      styles: { fontSize: 10 },
    });
  }

  // User Details
  doc.text('Customer Details', 14, doc.lastAutoTable.finalY + 20);
  
  const userDetails = [];
  if (data.userDetails.name) userDetails.push(['Name', data.userDetails.name]);
  if (data.userDetails.mobile) userDetails.push(['Mobile', data.userDetails.mobile]);
  if (data.userDetails.email) userDetails.push(['Email', data.userDetails.email]);
  if (data.userDetails.flatNumber) userDetails.push(['Flat Number', data.userDetails.flatNumber]);
  if (data.userDetails.address) userDetails.push(['Address', data.userDetails.address]);

  if (userDetails.length > 0) {
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 25,
      head: [],
      body: userDetails,
      theme: 'plain',
      styles: { fontSize: 10 },
    });
  }

  // Price Settings
  doc.text('Price Settings', 14, doc.lastAutoTable.finalY + 20);
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 25,
    head: [],
    body: [
      ['Box Price (per unit)', `₹${data.priceSettings.boxPrice}`],
      ['Frame Price (per unit)', `₹${data.priceSettings.framePrice}`],
      ['Work Type', data.priceSettings.workType],
    ],
    theme: 'plain',
    styles: { fontSize: 10 },
  });

  // Room Details
  data.rooms.forEach((room) => {
    if (doc.lastAutoTable.finalY > 250) {
      doc.addPage();
    }

    doc.text(`${room.type || 'Room'} Details`, 14, doc.lastAutoTable.finalY + 20);

    const tableBody = room.items.map((item, index) => [
      index + 1,
      item.name,
      item.type,
      item.length.toString(),
      item.breadth.toString(),
      item.totalLength.toFixed(2),
      `₹${item.totalPrice.toFixed(2)}`,
    ]);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 25,
      head: [['#', 'Item Name', 'Type', 'Length', 'Breadth', 'Total Length', 'Total Price']],
      body: tableBody,
      theme: 'striped',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [71, 85, 105] },
    });

    // Add total for this room
    const roomTotal = room.items.reduce((sum, item) => sum + item.totalPrice, 0);
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 2,
      body: [[{ content: 'Room Total:', styles: { fontStyle: 'bold' } }, { content: `₹${roomTotal.toFixed(2)}`, styles: { fontStyle: 'bold' } }]],
      theme: 'plain',
      styles: { fontSize: 10 },
    });
  });

  // Grand Total
  const grandTotal = data.rooms.reduce((sum, room) => 
    sum + room.items.reduce((roomSum, item) => roomSum + item.totalPrice, 0), 0
  );

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    body: [[{ content: 'Grand Total:', styles: { fontStyle: 'bold' } }, { content: `₹${grandTotal.toFixed(2)}`, styles: { fontStyle: 'bold' } }]],
    theme: 'plain',
    styles: { fontSize: 12 },
  });

  return doc;
}