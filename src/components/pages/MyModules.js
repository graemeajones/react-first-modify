import { useState } from 'react';
import useFetch  from '../api/useFetch.js';
import { CardContainer } from '../UI/Card.js';
import ModuleCard from '../entities/Modules/ModuleCard.js';
import ModuleForm from '../entities/Modules/ModuleForm.js';
import ToolTipDecorator from '../UI/ToolTipDecorator.js';
import Action from '../UI/Actions.js';
import Modal from '../UI/Modal.js';
import './MyModules.css';


export default function MyModules() {
  // Properties ----------------------------------
  // State ---------------------------------------
  const [modules, setModules, loadingMessage] = useFetch("Modules", "GET");
  const [showFavourites, setShowFavourites] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalHeading, setModalHeading] = useState(undefined);
  const [modalContent, setModalContent] = useState(undefined);
  const [modalActions, setModalActions] = useState([]);

  // Context -------------------------------------
  // Methods -------------------------------------

  // Select handler
  const handleSelect = (name) => console.log(`Module ${name} selected`);

  // List handlers
  const handleListAllModules = () => setShowFavourites(false);
  const handleListFavourites = () => setShowFavourites(true);
  
  // Favourite handlers
  const handleSubscribe = (id) => setModules(
    modules.map((module) => module.ModuleID === id ? { ...module, isSubscribed: true } : module)
  );

  const handleUnsubscribe = (id) => setModules(
    modules.map((module) => module.ModuleID === id ? { ...module, isSubscribed: false } : module)
  );

  // Delete handlers
  const handleDelete = (id) => {
    setModules(modules.filter((module) => module.ModuleID !== id));
    handleDismiss();
  }

  const handleDeleteRequest = (id) => {
    const deleteModule = modules.find((module) => module.ModuleID === id);
    setModalHeading("Alert!");
    setModalContent(<p>Are you sure you want to delete module {deleteModule.ModuleCode} {deleteModule.ModuleName}?</p>);
    setModalActions(
      [
        <ToolTipDecorator key="ActionYes" message="Click to confirm deletion">
          <Action.Yes showText onClick={() => handleDelete(id)} />
        </ToolTipDecorator>,
        <ToolTipDecorator key="ActionNo" message="Click to abandon deletion">
          <Action.No showText onClick={() => handleDismiss()} />
        </ToolTipDecorator>
      ]
    );
    setShowModal(true);
  };

  // Add handlers
  const handleAdd = (newModule) => {
    newModule.ModuleID = 1 + Math.max(...modules.map(module => module.ModuleID));
    setModules([...modules, newModule]);
    setShowModal(false);
  }

  const handleAddRequest = () => {
    setModalHeading("Add new module");
    setModalContent(<ModuleForm onSubmit={handleAdd} onCancel={handleDismiss} />);
    setModalActions(null);
    setShowModal(true);
  };

  // Modify handlers
  const handleModify = (targetModule) => {
    const targetIndex = modules.findIndex(module => module.ModuleID === targetModule.ModuleID);
    setModules(modules.map((module, index) => index === targetIndex ? targetModule : module));
    setShowModal(false);
  }

  const handleModifyRequest = (targetModule) => {
    setModalHeading("Modify module");
    setModalContent(<ModuleForm onSubmit={handleModify} onCancel={handleDismiss} initialModule={targetModule} />);
    setModalActions(null);
    setShowModal(true);
  };

  // Modal handlers
  const handleDismiss = () => setShowModal(false);

  // View ----------------------------------------
  return (
    <>
      <h1>My Modules</h1>

      <Action.Tray>
        {
          showFavourites
            ? <ToolTipDecorator message="List all modules">
                <Action.ListAll showText onClick={handleListAllModules} />
              </ToolTipDecorator>
            : <ToolTipDecorator message="List favourite modules">
                <Action.Favourites showText onClick={handleListFavourites} />
              </ToolTipDecorator>
        }
        <ToolTipDecorator message="Add a new module">
          <Action.Add showText onClick={handleAddRequest} />
        </ToolTipDecorator>
      </Action.Tray>

      {
        !modules
          ? <p>{loadingMessage}</p>
          : modules.length === 0
              ? <p>No modules found</p>
              : <CardContainer>
                  {
                    modules.map((module) => 
                      (!showFavourites || module.isSubscribed) &&
                        <ModuleCard
                          key={module.ModuleID}
                          module={module}
                          handlers={{
                            handleSelect,
                            handleSubscribe,
                            handleUnsubscribe,
                            handleModify: handleModifyRequest,
                            handleDelete: handleDeleteRequest
                          }}
                        />
                    )
                  }
                </CardContainer>
      }

      {
        showModal &&
          <Modal title={modalHeading} actions={modalActions}>
            {modalContent}
          </Modal>
      }
    </>
  )
}
