import { useState, FormEvent, ChangeEvent } from 'react';
import { ProjectData } from '../shared/types';

import Board from '../components/Board';
import Spinner from '../components/Spinner';
import Description from '../components/Description';
import { getInit, getProject } from '../api';
import ErrorMessage from '../components/ErrorMessage';
import { isValid } from '../shared/methods';

const Content: React.FC = () => {
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [projectId, setProjectId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const displayContent = projectData && !isLoading;

  const fetchProjectInfoHandler = async () => {
    try {
      const response = await getInit();
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    }
  };

  const fetchProjectDataHandler = async (id: string) => {
    try {
      const response = await getProject(id);

      if (isValid(response.data)) {
        setProjectData(response.data);
      } else {
        setErrorMessage('Something went wrong! :(');
      }
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    }
  };

  const clearOldData = () => {
    setErrorMessage('');
    setProjectData(null);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    clearOldData();

    if (projectId) {
      await fetchProjectDataHandler(projectId);
    } else {
      const info = await fetchProjectInfoHandler();
      await fetchProjectDataHandler(info.id);
    }
    setIsLoading(false);
  };

  return (
    <div className='content'>
      <form onSubmit={onSubmit}>
        <label htmlFor='projectId'>Project ID:</label>
        <input
          type='text'
          name='projectId'
          value={projectId}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setProjectId(e.target.value);
          }}
        />
        <button type='submit'>fetch</button>
      </form>
      {displayContent && (
        <Description
          projectId={projectData.id}
          name={projectData.project.name}
        />
      )}
      <ErrorMessage isVisible={!!errorMessage} message={errorMessage} />
      {displayContent && (
        <Board
          width={projectData.project.width}
          height={projectData.project.height}
          rectangles={projectData.project.items}
        />
      )}
      <Spinner isVisible={isLoading} />
    </div>
  );
};

export default Content;
