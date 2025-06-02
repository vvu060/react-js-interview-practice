import { useState } from 'react';

function FileExplorer() {
  const initialFiles = [
    {
      id: 1,
      name: 'vite-project',
      type: 'folder',
      isOpen: false,
      subItems: [
        {
          id: 2,
          name: 'node_modules',
          type: 'folder',
          isOpen: false,
          subItems: [
            { id: 3, name: 'react', type: 'folder', isOpen: false },
            { id: 4, name: 'react-dom', type: 'folder', isOpen: false },
            { id: 5, name: 'typescript', type: 'folder', isOpen: false },
          ],
        },
        {
          id: 6,
          name: 'src',
          type: 'folder',
          isOpen: false,
          subItems: [
            { id: 7, name: 'App.tsx', type: 'file' },
            { id: 8, name: 'main.tsx', type: 'file' },
            { id: 9, name: 'index.css', type: 'file' },
            {
              id: 10,
              name: 'components',
              type: 'folder',
              isOpen: false,
              subItems: [
                { id: 11, name: 'Header.tsx', type: 'file' },
                { id: 12, name: 'Footer.tsx', type: 'file' },
              ],
            },
          ],
        },
        { id: 13, name: 'package.json', type: 'file' },
        { id: 14, name: 'tsconfig.json', type: 'file' },
        { id: 15, name: 'README.md', type: 'file' },
      ],
    },
  ];

  const [files, setFiles] = useState(initialFiles);

  const toggleFolder = (itemId) => {
    const updateItems = (items) => {
      return items.map((item) => {
        if (item.id === itemId) {
          return { ...item, isOpen: !item.isOpen };
        }
        if (item.subItems) {
          return { ...item, subItems: updateItems(item.subItems) };
        }
        return item;
      });
    };

    setFiles(updateItems(files));
  };

  const FileTreeItem = ({ item, depth = 0 }) => {
    const paddingLeft = `${depth * 20}px`;

    return (
      <div style={{ paddingLeft: paddingLeft }}>
        <div
          className={`file-item ${item.type === 'folder' ? 'folder' : 'file'}`}
          onClick={() => item.type === 'folder' && toggleFolder(item.id)}
        >
          {item.type === 'folder' && (
            <span className='folder-icon'>{item.isOpen ? '📂' : '📁'}</span>
          )}
          {item.type === 'file' && <span className='file-icon'>📄</span>}
          <span className='item-name'>{item.name}</span>
        </div>
        {item.type === 'folder' && item.isOpen && item.subItems && (
          <div className='sub-items'>
            {item.subItems.map((subItem) => (
              <FileTreeItem key={subItem.id} item={subItem} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='app-container'>
      <h1>File Explorer</h1>
      <div className='file-explorer'>
        {files.map((file) => (
          <FileTreeItem key={file.id} item={file} />
        ))}
      </div>
    </div>
  );
}

export default FileExplorer;
