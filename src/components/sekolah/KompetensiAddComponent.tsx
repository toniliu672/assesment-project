import React, { useEffect, useState } from 'react';
import Select, { components, OptionProps } from 'react-select';
import { getOkupasiByKode, getAllOkupasi } from '../../api/okupasi-api';
import { addKompetensi } from '../../api/sekolah-api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface KompetensiAddComponentProps {
    sekolahId: string;
    onSuccess: () => void;
}

const KompetensiAddComponent: React.FC<KompetensiAddComponentProps> = ({ sekolahId, onSuccess }) => {
    const [okupasiOptions, setOkupasiOptions] = useState<any[]>([]);
    const [selectedOkupasi, setSelectedOkupasi] = useState<any | null>(null);
    const [unitKompetensiOptions, setUnitKompetensiOptions] = useState<any[]>([]);
    const [selectedUnits, setSelectedUnits] = useState<any[]>([]);

    useEffect(() => {
        const fetchAllOkupasi = async () => {
            try {
                const data = await getAllOkupasi();
                setOkupasiOptions(data.data.map((item: any) => ({ value: item.kode, label: `${item.kode} - ${item.nama}` })));
            } catch (error) {
                toast.error('Error fetching okupasi.', {
                    position: "bottom-right"
                });
                console.error('Error fetching okupasi:', error);
            }
        };
        fetchAllOkupasi();
    }, []);

    useEffect(() => {
        if (selectedOkupasi) {
            const fetchOkupasiByKode = async () => {
                try {
                    const data = await getOkupasiByKode(selectedOkupasi.value);
                    setUnitKompetensiOptions(data.data.unit_kompetensi.map((unit: any) => ({ value: unit.id, label: unit.nama })));
                } catch (error) {
                    toast.error('Error fetching unit kompetensi.', {
                        position: "bottom-right"
                    });
                    console.error('Error fetching unit kompetensi:', error);
                }
            };
            fetchOkupasiByKode();
        } else {
            setUnitKompetensiOptions([]);
        }
    }, [selectedOkupasi]);

    const handleUnitChange = (selectedOptions: any) => {
        setSelectedUnits(selectedOptions);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedOkupasi || selectedUnits.length === 0) {
            toast.error('Both Okupasi and at least one Unit Kompetensi must be selected.', {
                position: "bottom-right"
            });
            console.error('Both Okupasi and at least one Unit Kompetensi must be selected');
            return;
        }

        try {
            await addKompetensi(sekolahId, selectedOkupasi.value, selectedUnits.map((unit: any) => ({ id: unit.value })));
            toast.success('Kompetensi berhasil ditambahkan.', {
                position: "bottom-right"
            });
            // Clear the form
            setSelectedOkupasi(null);
            setUnitKompetensiOptions([]);
            setSelectedUnits([]);
            onSuccess();
        } catch (error: any) {
            const serverErrorMessage = error.response?.data?.errors?.[0]?.message || 'Failed to add kompetensi.';
            toast.error(serverErrorMessage, {
                position: "bottom-right"
            });
            console.error('Error adding kompetensi:', error);
        }
    };

    const Option = (props: OptionProps<any>) => (
        <components.Option {...props}>
            <input
                type="checkbox"
                checked={props.isSelected}
                onChange={() => null}
            />{' '}
            <label>{props.label}</label>
        </components.Option>
    );

    return (
        <div>
            <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
                <h3 className="text-lg font-bold text-gray-800 mb-4 dark:text-white">Tambah Unit Kompetensi</h3>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 dark:text-gray-300">Okupasi:</label>
                    <Select
                        value={selectedOkupasi}
                        onChange={setSelectedOkupasi}
                        options={okupasiOptions}
                        placeholder="Select Okupasi"
                        className="mb-3"
                        classNamePrefix="react-select"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 dark:text-gray-300">Unit Kompetensi:</label>
                    <Select
                        value={selectedUnits}
                        onChange={handleUnitChange}
                        options={unitKompetensiOptions}
                        placeholder="Select Unit Kompetensi"
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{ Option }}
                        className="mb-3"
                        classNamePrefix="react-select"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors duration-300 ease-in-out dark:bg-gray-700 dark:hover:bg-gray-800"
                >
                    Simpan
                </button>
            </form>
        </div>
    );
};

export default KompetensiAddComponent;
