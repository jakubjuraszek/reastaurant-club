import { useState, FormEvent } from 'react';
import { ProjectData } from '../shared/types';

import Board from '../components/Board';
import Spinner from '../components/Spinner';
import Description from '../components/Description';
import { getInit, getProject } from '../api';
import ErrorMessage from '../components/ErrorMessage';
import { isValid } from '../shared/methods';
import Form from '../components/Form';

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
      <Form
        name='projectId'
        value={projectId}
        submitLabel='fetch'
        onSubmit={onSubmit}
        handleChange={e => {
          setProjectId(e.target.value);
        }}
        inputLabel='Project ID:'
      />
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
