export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home',
  },
  {
    text: 'Modüller',
    icon: 'folder',
    items: [
      {
        text: 'Modül Ekle',
        path: '/modul-ekle',
      },
      {
        text: 'Modül Listesi',
        path: '/modul-listesi',
      },
    ],
  },
  {
    text: 'Veri Listesi',
    path: '/veri-listesi',
    icon: 'datafield',
  },
  {
    text: 'Dosyalar',
    icon: 'doc',
    items: [
      {
        text: 'Dosya Ekle',
        path: '/dosya-ekle',
      },
      {
        text: 'Dosya Listesi',
        path: '/dosya-listesi',
      },
    ],
  },
];
