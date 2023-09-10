import React, { useState } from 'react';
import {
  BaseLayout,
  BasicTypeahead,
  MultiSelectTypeahead,
  AsyncTypeahead,
} from 'modules/common/components';
import { cities } from 'modules/common/config';

const Home = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [selections, setSelections] = useState<string[]>([]);
  const [value3, setValue3] = useState('');

  const fetchCities = async (query: string) => {
    const trimmedQuery = (query || '')?.trim();
    return new Promise<string[]>((resolve, reject) => {
      setTimeout(() => {
        if (!trimmedQuery) {
          return resolve([]);
        }
        const results = cities.filter((city) =>
          city.toLowerCase().includes(trimmedQuery.toLowerCase()),
        );
        return resolve(results);
      }, 300);
    })
      .then((data) => {
        setOptions(data);
        return data;
      })
      .catch(() => {
        setOptions([]);
      });
  };
  return (
    <BaseLayout>
      <h1 className="font-bold text-4xl mb-14">Typeahead</h1>
      <div className="flex gap-2 w-full justify-center flex-wrap">
        <div className="w-[35rem]">
          <h2 className="font-bold text-2xl mb-4">Basic Typeahead</h2>
          <BasicTypeahead onValueChange={setValue1} options={cities} />
          <br />
          <p>{JSON.stringify({ value1 }, null, 2)}</p>
        </div>
        <div className="w-[35rem]">
          <h2 className="font-bold text-2xl mb-4">Multi Select Typeahead</h2>
          <MultiSelectTypeahead
            onValueChange={setValue2}
            onSelectionChange={setSelections}
            options={cities}
          />
          <br />
          <p>{JSON.stringify({ value2, selections }, null, 2)}</p>
        </div>
        <div className="w-[35rem]">
          <h2 className="font-bold text-2xl mb-4">Async Typeahead</h2>
          <AsyncTypeahead
            onValueChange={setValue3}
            onSearch={fetchCities}
            debounceTimeMS={250}
            options={options}
          />
          <br />
          <p>{JSON.stringify({ value3 }, null, 2)}</p>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Home;
