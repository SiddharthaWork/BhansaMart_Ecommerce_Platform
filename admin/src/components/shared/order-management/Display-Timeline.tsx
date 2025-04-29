import { Icon } from '@iconify/react/dist/iconify.js';
import { Text } from '../Text';

interface displayTimeLineDataTypes {
  icon?: string;
  title?: string;
  subTitle?: string;
  isCompleted?: boolean;
  displayProgress?: boolean;
}

export const DisplayTimeline = ({
  icon,
  title,
  subTitle,
  isCompleted,
  displayProgress,
}: displayTimeLineDataTypes) => {
  return (
    <div className="flex flex-col gap-2">
      <section className="flex place-items-center gap-3">
        <div
          className={`w-8 h-8 rounded-full border-2 ${
            isCompleted ? 'border-primary-blue' : 'border-silver-100'
          }  flex place-items-center justify-center`}
        >
          <Icon
            icon={icon ?? 'mdi:user'}
            fontSize={24}
            color={`${isCompleted ? '#2275FC' : '#888888'}`}
          />
        </div>
        <div className="flex flex-col">
          <Text
            size="body-xs-rare"
            variant={`${isCompleted ? 'primary-blue' : 'grey-400'}`}
          >
            {title}
          </Text>
          <Text size="body-xs-default" variant="grey-400">
            {subTitle}
          </Text>
        </div>
      </section>
      {displayProgress && (
        <section className="flex flex-col pl-3 gap-2  pt-1">
          {Array(8)
            .fill('*')
            .map((_, index) => (
              <section
                className={`${index === 0 ? ' h-[5px] ' : ''} rounded-full ${
                  isCompleted ? 'bg-primary-blue' : 'bg-silver-100'
                } w-2 h-2 `}
                key={index}
              />
            ))}
        </section>
      )}
    </div>
  );
};
