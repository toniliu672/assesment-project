# Dokumentasi Komponen

## Struktur Direktori Komponen

```plaintext
components/
├── homepage/                               # spesific component for HomePage
│   ├── BottomBar.tsx
│   ├── GoogleMapComponent.tsx
│   └── Sidebar.tsx
├── okupasi/                                # specific component for DataOkupasiPage
│   ├── OkupasiAddForm.tsx      
│   ├── OkupasiEditForm.tsx
│   ├── OkupasiList.tsx
│   ├── UnitKompetensiAddForm.tsx
│   ├── UnitKompetensiEditForm.tsx
│   └── UnitKompetensiList.tsx
├── sekolah/                                # specific component for DataSekolahPage  
│   ├── KompetensiAddComponent.tsx
│   ├── KompetensiEditFormComponent.tsx
│   ├── KompetensiListFormComponent.tsx
│   ├── SekolahAddFormComponent.tsx
│   ├── SekolahEditFormComponent.tsx
│   └── SekolahListComponent.tsx
├── ConfirmationModal.tsx                   # component for confirmation modal
├── ErrorNotification.tsx                   # component for error notification
├── InfoBar.tsx                             # component for info bar
├── Loading.tsx                             # component for loading
├── Logout.tsx                              # component for logout
├── Navbar.tsx                              # component for navbar
├── SearchBar.tsx                           # component for search bar
```

# Dokumentasi Komponen Spesifik

## `BottomBar.tsx`
- **Deskripsi**: Komponen ini digunakan di HomePage untuk mengubah sidebar pada tampilan mobile.
- **Penggunaan**: Hanya di HomePage.
- **Status**: Diaktfikan ketika layout dibawah dari 540px

## `GoogleMapComponent.tsx`
- **Deskripsi**: Komponen ini digunakan untuk menampilkan Google Maps.
- **Penggunaan**: Hanya di HomePage jika menggunakan Google Maps API.

## `SearchBar.tsx`
- **Deskripsi**: Komponen ini digunakan untuk menampilkan bar pencarian.
- **Penggunaan**: Digunakan di HomePage dan FormPage.

## `Sidebar.tsx`
- **Deskripsi**: Komponen sidebar yang digunakan untuk navigasi.
- **Penggunaan**: Hanya di HomePage.
