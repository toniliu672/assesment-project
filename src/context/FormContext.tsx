import { createContext, useState, ReactNode, useContext } from 'react';

interface Kompetensi {
  kode: string;
  nama: string;
  unit_kompetensi: {
    id: string;
    nama: string;
  }[];
}

interface School {
  id: string;
  nama: string;
  kota: string;
  lat: number;
  lng: number;
  kecocokan?: string;
  kompetensi?: Kompetensi[];
}

interface FormContextType {
  kodeOkupasi: string;
  setKodeOkupasi: (kode: string) => void;
  schools: School[];
  setSchools: (schools: School[]) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [kodeOkupasi, setKodeOkupasi] = useState<string>('');
  const [schools, setSchools] = useState<School[]>([]);

  return (
    <FormContext.Provider value={{ kodeOkupasi, setKodeOkupasi, schools, setSchools }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
