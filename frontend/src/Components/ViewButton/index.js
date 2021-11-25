import {React} from "react";
import { Button } from "@material-ui/core";
import req from "../../api/index"
import "./ViewButton.css";
import fs from 'fs';

function ViewButton(props) {

    function getFiles() {
        var form_data = {};
        form_data["type"] = props.text.toLowerCase();
        form_data["userId"] = props.userId;
        form_data["jobId"] = props.jobId;

        req.put("/jobs/getfile", form_data, {
            body: JSON.stringify(form_data),
            headers: {
                'Content-Type': 'application/json',
            },
            responseType: 'blob'
        }).then((res) => {
            if(form_data["type"] == "resume") {
                var file = new Blob([res.data], {type: 'application/pdf'});
            } else {
                var file = new Blob([res.data], {type: 'video/mp4'});
            }
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        })
    }

    if(!props.subtext) {
        var subtext = " "
    } else {
        var subtext = props.subtext + " "        
    }

    return (
        <Button
            variant="contained"
            color="primary"

            onClick={() => getFiles()}
            >
            {"View " + subtext + props.text}
        </Button>
    )
}

export default ViewButton;