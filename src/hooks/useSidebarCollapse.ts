'use client';
import { useContext } from 'react';
import { SidebarContext } from '@/contexts/SidebarContext';

export const useSidebarCollapse = () => {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error('useSidebarCollapse must be used within a SidebarProvider');
	}
	return context;
};