import { createReactBlockSpec } from '@blocknote/react';
import { ActionIcon, Button, Radio, TextInput } from '@mantine/core';
import { MdAdd, MdDelete } from 'react-icons/md';
import './index.css';

// Asked on Discord how I can build a complex block like this: https://discord.com/channels/928190961455087667/1335029745535942667/1335029745535942667

type Option = {
  id: string;
  content: string;
  correct: boolean;
};

export const MultipleChoice = createReactBlockSpec(
  {
    type: 'multipleChoice',
    propSchema: {
      points: {
        default: 1,
      },
      ordinal: {
        default: false,
      },
      choices: {
        type: 'number',
        default: undefined,
      },
      noneOfTheAbove: {
        default: false,
      },
      options: {
        default: JSON.stringify([
          {
            id: crypto.randomUUID(),
            content: 'Option 1',
            correct: true,
          },
          {
            id: crypto.randomUUID(),
            content: 'Option 2',
            correct: false,
          },
          {
            id: crypto.randomUUID(),
            content: 'Option 3',
            correct: false,
          },
          {
            id: crypto.randomUUID(),
            content: 'Option 4',
            correct: false,
          },
        ]),
        type: 'string',
      },
    },
    content: 'none',
  },
  {
    render: ({ block, editor }) => {
      const options: Option[] = JSON.parse(block.props.options);

      const updateOptions = (newOptions: Option[]) => {
        editor.updateBlock(block, {
          type: 'multipleChoice',
          props: {
            options: JSON.stringify(newOptions),
          },
        });
      };

      return (
        <div className="multiple-choice-container">
          <div className="options-list">
            {options.map(option => (
              <div key={option.id} className="option-row">
                <Radio
                  checked={option.correct}
                  onChange={() => {
                    updateOptions(
                      options.map(o => ({
                        ...o,
                        correct: o.id === option.id,
                      })),
                    );
                  }}
                  value={option.id}
                  name="multiple-choice-group"
                  className="option-radio"
                  color="blue"
                  size="md"
                  aria-label="Select correct answer"
                />
                <TextInput
                  className="option-input"
                  value={option.content}
                  onChange={e => {
                    updateOptions(
                      options.map(o =>
                        o.id === option.id
                          ? { ...o, content: e.target.value }
                          : o,
                      ),
                    );
                  }}
                />
                <ActionIcon
                  variant="transparent"
                  color="red"
                  className="delete-button"
                  onClick={() => {
                    updateOptions(
                      options.filter(o => o.id !== option.id),
                    );
                  }}
                >
                  <MdDelete size={20} />
                </ActionIcon>
              </div>
            ))}
          </div>
          <Button
            variant="filled"
            color="blue"
            leftSection={<MdAdd size={18} />}
            onClick={() => {
              updateOptions([
                ...options,
                {
                  id: crypto.randomUUID(),
                  content: 'New Option',
                  correct: false,
                },
              ]);
            }}
            className="add-option-button"
            size="sm"
          >
            Add Option
          </Button>
        </div>
      );
    },
  },
);
