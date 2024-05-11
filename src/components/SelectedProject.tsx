import { useProjects } from '../contexts/ProjectsContext';

const SelectedProjectScreen = () => {
  const { selectedProject } = useProjects();
  console.log(selectedProject);
  return (
    <div>
      <h1>esssa{selectedProject?.name}</h1>
    </div>
  );
};

export default SelectedProjectScreen;
