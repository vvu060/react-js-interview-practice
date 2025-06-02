import { useState } from 'react';

const CheckboxesData = [
  {
    id: 1,
    label: 'Fruits',
    children: [
      { id: 2, label: 'Apple' },
      { id: 3, label: 'Banana' },
      {
        id: 4,
        label: 'Citrus',
        children: [
          { id: 5, label: 'Orange' },
          { id: 6, label: 'Lemon' },
        ],
      },
    ],
  },
  {
    id: 7,
    label: 'Vegetables',
    children: [
      { id: 8, label: 'Carrot' },
      { id: 9, label: 'Broccoli' },
    ],
  },
];

const CheckBoxes = ({ data, checked, setChecked }) => {
  const handleChange = (isChecked, node) => {
    setChecked((prev) => {
      const newState = { ...prev, [node.id]: isChecked };

      const updateChildren = (node) => {
        node.children?.forEach((child) => {
          newState[child.id] = isChecked;
          child.children && updateChildren(child);
        });
      };

      const updateParents = (node, data) => {
        const findParent = (nodeId, tree) => {
          for (const item of tree) {
            if (item.children?.some((child) => child.id === nodeId)) {
              return item;
            }
            const found = item.children && findParent(nodeId, item.children);
            if (found) return found;
          }
          return null;
        };

        let parent = findParent(node.id, data);

        while (parent) {
          const allChildrenChecked = parent.children.every(
            (child) => newState[child.id]
          );
          newState[parent.id] = allChildrenChecked;
          parent = findParent(parent.id, data);
        }
      };

      updateChildren(node);
      updateParents(node, CheckboxesData);

      return newState;
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'start',
        textAlign: 'left',
      }}
    >
      {data?.map((node) => (
        <div
          style={{
            paddingLeft: '16px',
          }}
          key={node.id}
        >
          <input
            type='checkbox'
            checked={checked[node.id] || false}
            onChange={(e) => handleChange(e.target.checked, node)}
          />
          <span>{node.label}</span>
          {node.children && (
            <CheckBoxes
              data={node.children}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const NestedCheckboxes = () => {
  const [checked, setChecked] = useState({});

  return (
    <div>
      <h1>NestedCheckboxes</h1>
      <CheckBoxes
        data={CheckboxesData}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
};
export default NestedCheckboxes;
