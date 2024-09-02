import { useState } from 'react';
import { addOkupasi } from '../../api/okupasi-api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface OkupasiAddFormProps {
    onAddSuccess: () => void;
}

const OkupasiAddForm: React.FC<OkupasiAddFormProps> = ({ onAddSuccess }) => {
    const [kode, setKode] = useState('');
    const [nama, setNama] = useState('');
    const [unitKompetensi, setUnitKompetensi] = useState([{ nama: '' }]);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!/^\d+$/.test(kode)) {
            setError('Kode harus berupa angka.');
            return;
        }

        if (nama.trim() === '') {
            setError('Nama tidak boleh kosong.');
            return;
        }

        try {
            await addOkupasi(kode, nama, unitKompetensi);
            setKode('');
            setNama('');
            setUnitKompetensi([{ nama: '' }]);
            setError(null);
            onAddSuccess();
            toast.success(`Item dengan kode ${kode} dan nama ${nama} berhasil ditambahkan.`, {
                position: "bottom-right"
            });
        } catch (error) {
            toast.error('Gagal menambahkan okupasi. Silakan coba lagi.', {
                position: "bottom-right"
            });
        }
    };

    const handleUnitKompetensiChange = (index: number, value: string) => {
        const updatedUnits = unitKompetensi.map((unit, i) =>
            i === index ? { nama: value } : unit
        );
        setUnitKompetensi(updatedUnits);
    };

    const addUnitKompetensiField = () => {
        setUnitKompetensi([...unitKompetensi, { nama: '' }]);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
            <h2 className="text-lg font-bold text-black mb-4 dark:text-white">Tambah Okupasi</h2>
            {error && <div className="text-red-500 mb-4 dark:text-red-400">{error}</div>}
            <div>
                <label className="block text-gray-700 dark:text-gray-300">Kode:</label>
                <input
                    type="text"
                    value={kode}
                    onChange={(e) => setKode(e.target.value)}
                    className="mt-1 p-3 block w-full rounded-md border-2 border-gray-300 focus:border-black focus:ring focus:ring-black focus:ring-opacity-50 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:focus:border-white dark:focus:ring-white"
                />
            </div>
            <div>
                <label className="block text-gray-700 dark:text-gray-300">Nama:</label>
                <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="mt-1 p-3 block w-full rounded-md border-2 border-gray-300 focus:border-black focus:ring focus:ring-black focus:ring-opacity-50 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:focus:border-white dark:focus:ring-white"
                />
            </div>
            <div>
                <h3 className="text-md font-semibold text-black mt-4 dark:text-white">Unit Kompetensi</h3>
                <div className="max-h-64 overflow-y-auto">
                    {unitKompetensi.map((unit, index) => (
                        <div key={index} className="mt-2">
                            <label className="block text-gray-700 dark:text-gray-300">Nama:</label>
                            <input
                                type="text"
                                value={unit.nama}
                                onChange={(e) => handleUnitKompetensiChange(index, e.target.value)}
                                className="mt-1 p-3 block w-full rounded-md border-2 border-gray-300 focus:border-black focus:ring focus:ring-black focus:ring-opacity-50 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:focus:border-white dark:focus:ring-white"
                            />
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={addUnitKompetensiField}
                    className="mt-2 text-black px-4 py-2 rounded-md hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
                >
                    Tambah Unit Kompetensi
                </button>
            </div>
            <button type="submit" className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700">
                Simpan
            </button>
        </form>
    );
};

export default OkupasiAddForm;
