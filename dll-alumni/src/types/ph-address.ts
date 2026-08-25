/**
 * TypeScript types for the Philippine Standard Geographic Code (PSGC)
 * hierarchical address data structure from ph-address.json.
 *
 * Structure: Region → Province → Municipality/City → Barangay
 */

export interface MunicipalityData {
  barangay_list: string[];
}

export interface ProvinceData {
  municipality_list: Record<string, MunicipalityData>;
}

export interface RegionData {
  region_name: string;
  province_list: Record<string, ProvinceData>;
}

/**
 * Top-level structure: keyed by region code (e.g., "01", "02", "NCR")
 */
export type PhAddressData = Record<string, RegionData>;
