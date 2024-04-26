import React, { FC, useCallback, useMemo, useState, useRef } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { Input } from '@osrd-project/ui-core';
import * as Icons from '../index';
import type { UiIcon } from '../index';

const ICONS: Array<{ name: string; icon: UiIcon }> = Object.keys(Icons).map((name) => ({
  name,
  icon: Icons[name] as UiIcon,
}));

export const SearchIcons: FC<{
  size: 'sm' | 'lg';
  variant: 'base' | 'fill';
  title?: string;
  color: string;
}> = (args) => {
  console.log(args);
  const [search, setSearch] = useState('');
  const debounceTimer = useRef<null | number>(null);
  const debouncedOnSearch = useCallback(
    (search: string) => {
      if (debounceTimer.current) {
        window.clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = window.setTimeout(() => {
        setSearch(search);
      }, 200);
    },
    [debounceTimer]
  );
  const icons: Array<{ name: string; icon: UiIcon }> = useMemo(() => {
    return ICONS.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <div>
      <Input
        id="search"
        label="Search"
        type="text"
        onChange={(e) => debouncedOnSearch(e.target.value)}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'start' }}>
        {icons.map((i) => (
          <ErrorBoundary key={`${JSON.stringify(args)}-${i.name}`}>
            <div
              className="flex"
              style={{
                margin: '1em',
                display: 'flex',
                flexDirection: 'column',
                width: '3em',
                alignItems: 'center',
              }}
            >
              <span style={{ color: args.color }}>
                <i.icon {...args} />
              </span>
              <span style={{ fontSize: '0.5em' }}>{i.name}</span>
            </div>
          </ErrorBoundary>
        ))}
      </div>
    </div>
  );
};
