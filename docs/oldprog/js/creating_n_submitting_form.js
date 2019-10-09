/**
 *  Creating and Submitting Form on Fly using Javascript
 */

var form = document.createElement("form");

        form.setAttribute("method", "post");

        form.setAttribute("action", "default.aspx");

        form.setAttribute("target", "_blank");

        var hiddenField = document.createElement("input");

        hiddenField.setAttribute("name", "search");

        hiddenField.setAttribute("value","product1,product2" );

        hiddenField.setAttribute("type", "hidden");

        form.appendChild(hiddenField);

        document.body.appendChild(form);

        form.submit();