import { useState } from 'react';
import { MdExpandLess, MdExpandMore, MdDeleteOutline } from 'react-icons/md';
import { FiFolderPlus } from 'react-icons/fi';
import { AiOutlineFileAdd } from 'react-icons/ai';

const initialData = [
  {
    id: 1,
    name: 'public',
    isFolder: true,
    children: [{ id: 2, name: 'index.html', isFolder: false }],
  },
  {
    id: 3,
    name: 'src',
    isFolder: true,
    children: [
      { id: 4, name: 'App.js', isFolder: false },
      { id: 5, name: 'index.js', isFolder: false },
    ],
  },
  { id: 6, name: 'package.json', isFolder: false },
];

export default function FileExplorer() {
  const [data, setData] = useState(initialData);

  const handleAdd = (parentId, isFolder) => {
    const name = prompt('Enter Name');

    const newItem = {
      id: Date.now().toString(),
      name,
      isFolder,
      ...(isFolder ? { children: [] } : {}),
    };

    const updateTree = (nodes) => {
      return nodes.map((node) => {
        if (node.id === parentId && node.isFolder) {
          return {
            ...node,
            children: [...(node.children || []), newItem],
          };
        } else if (node.children) {
          return {
            ...node,
            children: updateTree(node.children),
          };
        }

        return node;
      });
    };

    setData(updateTree(data));
  };

  const handleDelete = (targetId) => {
    const deleteNode = (nodes) => {
      return nodes
        .filter((node) => node.id !== targetId)
        .map((node) =>
          node.children
            ? {
                ...node,
                children: deleteNode(node.children),
              }
            : node
        );
    };

    setData(deleteNode(data));
  };

  return (
    <div>
      <h2>File Explorer</h2>
      <FileAndFolder data={data} onAdd={handleAdd} onRemove={handleDelete} />
    </div>
  );
}

const FileAndFolder = ({ data, onAdd, onRemove }) => {
  const [collapsed, setCollapsed] = useState({});

  return (
    <div
      style={{
        fontSize: '14px',
        fontWeight: 'normal',
        paddingLeft: '16px',
      }}
    >
      {data.map((node) => (
        <div key={node.id}>
          {node.isFolder ? (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                {collapsed[node.id] ? (
                  <MdExpandMore
                    onClick={() =>
                      setCollapsed((prev) => ({
                        ...prev,
                        [node.id]: !prev[node.id],
                      }))
                    }
                  />
                ) : (
                  <MdExpandLess
                    onClick={() =>
                      setCollapsed((prev) => ({
                        ...prev,
                        [node.id]: !prev[node.id],
                      }))
                    }
                  />
                )}
                <span>{node.name}</span>
                <FiFolderPlus size={15} onClick={() => onAdd(node.id, true)} />
                <AiOutlineFileAdd
                  size={15}
                  onClick={() => onAdd(node.id, false)}
                />
                <MdDeleteOutline size={15} onClick={() => onRemove(node.id)} />
              </div>
              {!collapsed[node.id] && node?.children && (
                <FileAndFolder
                  data={node.children}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
              )}
            </div>
          ) : (
            <div>
              <span>{node.name}</span>
              <MdDeleteOutline size={15} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
