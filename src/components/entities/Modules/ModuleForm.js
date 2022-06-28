import useFetch  from '../../api/useFetch.js';
import Form from '../../UI/Form.js';


export default function ModuleForm({ onSubmit, onCancel, initialModule=null }) {
  // Initialisation ----------------------------------
  const endpoint = "Users";
  const method = "GET";

  if (!initialModule) {
    initialModule = {
      ModuleName: "Programming 3",
      ModuleCode: "CI6001",
      ModuleLevel: 0,
      ModuleLeaderID: 0,
      ModuleImage: "https://images.freeimages.com/images/small-previews/fa1/cable-5-1243077.jpg"
    }
  }

  // State ---------------------------------------
  const [module, handleChange, errors, updateErrors] = Form.useFormState(initialModule);
  const [users, , loadingMessage] = useFetch(endpoint,method);
  
  // Methods -------------------------------------
  const handleSubmit = (event) => {
    event.preventDefault();

    const isValidName = isValidateModuleName();
    const isValidCode = isValidateModuleCode();
    const isValidYear = isValidateModuleLevel();
    const isValidLead = isValidateModuleLeader();
    const isValidImage = isValidateModuleImage();

    updateErrors({
      ModuleName: isValidName ? null : "Module name is too short",
      ModuleCode: isValidCode ? null : "Module code is not a valid format",
      ModuleLevel: isValidYear ? null : "Invalid module level",
      ModuleLeaderID: isValidLead ? null : "No module leader has been selected",
      ModuleImage: isValidImage ? null : "Module image is not a valid URL"
    });

    if (isValidName && isValidCode && isValidYear && isValidLead && isValidImage) {
      module.ModuleLevel = parseInt(module.ModuleLevel);
      module.ModuleLeaderID = parseInt(module.ModuleLeaderID);
      onSubmit(module);
    }
  }

  const isValidateModuleName = () => module.ModuleName.length > 8 ? true : false;
  const isValidateModuleCode = () => isValidModuleCode(module.ModuleCode) ? true : false;
  const isValidateModuleLevel = () => ((module.ModuleLevel > 2) && (module.ModuleLevel < 8)) ? true : false;
  const isValidateModuleLeader = () => parseInt(module.ModuleLeaderID) ? true : false;
  const isValidateModuleImage = () => isValidURL(module.ModuleImage) ? true : false;
  const isValidModuleCode = (value) => (/^\D{2}\d{4}$/.test(value));
  const isValidURL = (value) => (/^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?(#([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?)?$/.test(value));

  // View ----------------------------------------
  return (
    <Form onSubmit={handleSubmit} onChange={handleChange} onCancel={onCancel} >
      <Form.Item
        label="Module name"
        error={errors.ModuleName}
      >
        <input
          type="text"
          name="ModuleName"
          placeholder="Please enter the module name"
          value={module.ModuleName}
        />
      </Form.Item>
      
      <Form.Item
        label="Module code"
        error={errors.ModuleCode}
      >
        <input
          type="text"
          name="ModuleCode"
          placeholder="Please enter the module code"
          value={module.ModuleCode}
        />
      </Form.Item>

      <Form.Item
        label="Module level"
        advice="Choose a level between 3 and 7 inclusive"
        error={errors.ModuleLevel}
      >
        <input
          type="number"
          name="ModuleLevel"
          value={module.ModuleLevel}
        />
      </Form.Item>

      <Form.Item
        label="Module leader"
        error={errors.ModuleLeaderID}
      >
        {
          !users
            ? <p>{loadingMessage}</p>
            : users.length === 0
              ? <p>No users found</p>
              : <select
                  name="ModuleLeaderID"
                  value={module.ModuleLeaderID}
                >
                  <option value="0">Select module leader ...</option>
                  {
                    users.map((user) => 
                      <option key={user.UserID} value={user.UserID} >
                        {user.UserLastname}, {user.UserFirstname}
                      </option>
                    )
                  }
                </select>
        }
      </Form.Item>

      <Form.Item
        label="Module image URL"
        advice="Provide the URL of an image"
        error={errors.ModuleImage}
      >
        <input
          type="text"
          name="ModuleImage"
          value={module.ModuleImage}
        />
      </Form.Item>

    </Form>
  );
}
