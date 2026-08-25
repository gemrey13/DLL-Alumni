"use client";

import { useEffect, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Label } from "@/components/ui/label";
import phAddressData from "@/data/ph-address.json";
import type { PhAddressData } from "@/types/ph-address";

const addressData = phAddressData as PhAddressData;

interface AddressCascadeSelectProps {
  /** Field name prefix, e.g. "address_" or "company_address_" */
  prefix: string;
  /** Whether to show the country field (defaults to false, assumes Philippines) */
  showCountry?: boolean;
  /** Whether fields are disabled */
  disabled?: boolean;
}

/**
 * Reusable cascading Philippine address select component.
 * Integrates with React Hook Form via useFormContext().
 * Provides Region → Province → City/Municipality → Barangay cascading dropdowns.
 *
 * Field names generated: `${prefix}region`, `${prefix}province`, `${prefix}city`, `${prefix}barangay`, `${prefix}zip`
 */
export function AddressCascadeSelect({
  prefix,
  showCountry = false,
  disabled = false,
}: AddressCascadeSelectProps) {
  const { register, setValue, control } = useFormContext();

  // Watch the current values to drive cascading
  const regionValue = useWatch({ control, name: `${prefix}region` }) as string;
  const provinceValue = useWatch({ control, name: `${prefix}province` }) as string;
  const cityValue = useWatch({ control, name: `${prefix}city` }) as string;

  // Track if the user is changing a parent field (to reset children)
  const [isResettingFromRegion, setIsResettingFromRegion] = useState(false);
  const [isResettingFromProvince, setIsResettingFromProvince] = useState(false);
  const [isResettingFromCity, setIsResettingFromCity] = useState(false);

  // Get list of regions
  const regions = useMemo(() => {
    return Object.entries(addressData).map(([code, data]) => ({
      code,
      name: data.region_name,
    }));
  }, []);

  // Get provinces for selected region
  const provinces = useMemo(() => {
    if (!regionValue) return [];
    const regionEntry = Object.entries(addressData).find(
      ([, data]) => data.region_name === regionValue
    );
    if (!regionEntry) return [];
    return Object.keys(regionEntry[1].province_list).sort();
  }, [regionValue]);

  // Get cities/municipalities for selected province
  const cities = useMemo(() => {
    if (!regionValue || !provinceValue) return [];
    const regionEntry = Object.entries(addressData).find(
      ([, data]) => data.region_name === regionValue
    );
    if (!regionEntry) return [];
    const province = regionEntry[1].province_list[provinceValue];
    if (!province) return [];
    return Object.keys(province.municipality_list).sort();
  }, [regionValue, provinceValue]);

  // Get barangays for selected city
  const barangays = useMemo(() => {
    if (!regionValue || !provinceValue || !cityValue) return [];
    const regionEntry = Object.entries(addressData).find(
      ([, data]) => data.region_name === regionValue
    );
    if (!regionEntry) return [];
    const province = regionEntry[1].province_list[provinceValue];
    if (!province) return [];
    const city = province.municipality_list[cityValue];
    if (!city) return [];
    return city.barangay_list.sort();
  }, [regionValue, provinceValue, cityValue]);

  // Reset child fields when parent changes
  useEffect(() => {
    if (isResettingFromRegion) {
      setValue(`${prefix}province`, "");
      setValue(`${prefix}city`, "");
      setValue(`${prefix}barangay`, "");
      setIsResettingFromRegion(false);
    }
  }, [isResettingFromRegion, prefix, setValue]);

  useEffect(() => {
    if (isResettingFromProvince) {
      setValue(`${prefix}city`, "");
      setValue(`${prefix}barangay`, "");
      setIsResettingFromProvince(false);
    }
  }, [isResettingFromProvince, prefix, setValue]);

  useEffect(() => {
    if (isResettingFromCity) {
      setValue(`${prefix}barangay`, "");
      setIsResettingFromCity(false);
    }
  }, [isResettingFromCity, prefix, setValue]);

  const selectClassName =
    "w-full h-9 rounded-lg border border-input bg-background px-3 text-sm transition-colors focus:border-ring focus:ring-2 focus:ring-ring/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {showCountry && (
        <div className="space-y-2">
          <Label htmlFor={`${prefix}country`}>Country</Label>
          <input
            id={`${prefix}country`}
            {...register(`${prefix}country`)}
            className={selectClassName}
            defaultValue="Philippines"
            disabled={disabled}
          />
        </div>
      )}

      {/* Region */}
      <div className="space-y-2">
        <Label htmlFor={`${prefix}region`}>Region</Label>
        <select
          id={`${prefix}region`}
          {...register(`${prefix}region`, {
            onChange: () => setIsResettingFromRegion(true),
          })}
          className={selectClassName}
          disabled={disabled}
        >
          <option value="">Select Region...</option>
          {regions.map((r) => (
            <option key={r.code} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      {/* Province */}
      <div className="space-y-2">
        <Label htmlFor={`${prefix}province`}>Province</Label>
        <select
          id={`${prefix}province`}
          {...register(`${prefix}province`, {
            onChange: () => setIsResettingFromProvince(true),
          })}
          className={selectClassName}
          disabled={disabled || !regionValue}
        >
          <option value="">Select Province...</option>
          {provinces.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* City / Municipality */}
      <div className="space-y-2">
        <Label htmlFor={`${prefix}city`}>City / Municipality</Label>
        <select
          id={`${prefix}city`}
          {...register(`${prefix}city`, {
            onChange: () => setIsResettingFromCity(true),
          })}
          className={selectClassName}
          disabled={disabled || !provinceValue}
        >
          <option value="">Select City...</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Barangay */}
      <div className="space-y-2">
        <Label htmlFor={`${prefix}barangay`}>Barangay</Label>
        <select
          id={`${prefix}barangay`}
          {...register(`${prefix}barangay`)}
          className={selectClassName}
          disabled={disabled || !cityValue}
        >
          <option value="">Select Barangay...</option>
          {barangays.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* ZIP Code */}
      <div className="space-y-2">
        <Label htmlFor={`${prefix}zip`}>ZIP Code</Label>
        <input
          id={`${prefix}zip`}
          {...register(`${prefix}zip`)}
          placeholder="e.g. 4301"
          className={selectClassName}
          disabled={disabled}
          maxLength={10}
        />
      </div>
    </div>
  );
}
