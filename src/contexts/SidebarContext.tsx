'use client';

import React, { createContext, useState } from 'react';

export interface SidebarContextProps {
	isCollapsed: boolean;
	toggleSidebarCollapse: () => void;
}

interface SidebarProviderProps {
	children: React.ReactNode;
}

const initialValue = {
	isCollapsed: false, toggleSidebarCollapse: () => {
	},
};

/**
 *Sidebar Context for sidebar collapse
 *@Return:
 *React.Context<SidebarContextProps>
 *@example:
 *	const sidebar = useContext(SidebarContext);
 **/
const SidebarContext = createContext<SidebarContextProps>(initialValue);

/**
 * Sidebar Provider for sidebar collapse
 * @param children
 * @constructor
 * @Return:
 * React.FC
 * @Example
 * <SidebarProvider>
 *   <App />
 * </SidebarProvider>
 */
const SidebarProvider = ({ children }: SidebarProviderProps) => {
	const [isCollapsed, setCollapse] = useState(false);

	/**
	 *Toggle sidebar collapse
	 *@Return:
	 *	void
	 *@Example
	 *	toggleSidebarCollapse();
	 **/
	const toggleSidebarCollapse = () => {
		setCollapse((prevState) => !prevState);
	};

	return (
		<SidebarContext.Provider value={{ isCollapsed, toggleSidebarCollapse }}>
			{children}
		</SidebarContext.Provider>
	);
};

export { SidebarContext, SidebarProvider };