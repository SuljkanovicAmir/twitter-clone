import React from "react";

const Warning = ({title, message, cancel, action, actionName}) => {
	return (
		<div className="warning">
			<h3 className="">{title}</h3>
			<p className="grey">
				{message}
			</p>
			<div className="warning-buttons" >
				<button className="btn grey-btn" onClick={() => cancel()} style={{marginRight: "1rem"}}>
					Cancel
				</button>
				<button className="btn" onClick={action}>
                    {actionName}
				</button>
			</div>
		</div>
	);
};

export default Warning;