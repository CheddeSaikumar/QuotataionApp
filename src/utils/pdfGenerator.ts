import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { EstimationData } from '../types';
import {
  addHeader,
  addCompanyDetails,
  addUserDetails,
  addPriceSettings,
  addRoomDetails,
  addMaterialSpecifications,
  addGrandTotal,
  addFooter,
} from './pdfSections';

export function generatePDF(data: EstimationData) {
  const doc = new jsPDF();
  
  let currentY = addHeader(doc);

  // Only add sections if they have content
  if (hasCompanyDetails(data.companyDetails)) {
    currentY = addCompanyDetails(doc, data, currentY) + 20;
  }

  if (hasUserDetails(data.userDetails)) {
    currentY = addUserDetails(doc, data, currentY) + 20;
  }

  currentY = addPriceSettings(doc, data, currentY) + 20;

  // Add room details
  data.rooms.forEach((room) => {
    if (room.items.length > 0) {
      currentY = addRoomDetails(doc, room, currentY) + 20;
    }
  });

  // Add grand total if there are any rooms with items
  if (data.rooms.some(room => room.items.length > 0)) {
    currentY = addGrandTotal(doc, data, currentY) + 20;
  }

  // Add material specifications on a new page
  doc.addPage();
  currentY = 20;
  currentY = addMaterialSpecifications(doc, currentY);

  // Add footer to all pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    addFooter(doc);
  }

  return doc;
}

function hasCompanyDetails(details: EstimationData['companyDetails']): boolean {
  return Object.values(details).some(value => value.trim() !== '');
}

function hasUserDetails(details: EstimationData['userDetails']): boolean {
  return Object.values(details).some(value => value.trim() !== '');
}