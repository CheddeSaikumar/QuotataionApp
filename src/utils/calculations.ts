import type { RoomDetails, RoomItem } from '../types';

export function calculateItemTotal(item: RoomItem): number {
  return item.totalLength * (item.type === 'box' ? item.totalPrice : item.totalPrice);
}

export function calculateRoomTotal(room: RoomDetails): number {
  return room.items.reduce((sum, item) => sum + item.totalPrice, 0);
}

export function calculateGrandTotal(rooms: RoomDetails[]): number {
  return rooms.reduce((sum, room) => sum + calculateRoomTotal(room), 0);
}