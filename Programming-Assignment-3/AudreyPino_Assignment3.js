<head>
    <title>Pino Tab Page</title>
</head>
<tab-panel>
    <div data-tabname="A">Tab A</div>
    <div data-tabname="B">Tab B</div>
    <div data-tabname="C">Tab C</div>
</tab-panel>
<script>
    function asTabs(node) { // takes a DOM node and creates a tabbed interface showing the child elements of that node
        let tabs = Array.from(node.children).map(node => { // creates new array of children nodes called tabs
            let button = document.createElement("button"); // creates button tagname
            button.textContent = node.getAttribute("data-tabname"); // returns the value of data tagname on the element
            let tab = {node, button}; // tabs are now button nodes from the array
            button.addEventListener("click", () => selectTab(tab)); // calls the selectTab function immediately (passing it the value of the tab variable)
            return tab; // returns value of tab
        });

        let tabList = document.createElement("div"); // defines tab section in document
        for (let {button} of tabs) tabList.appendChild(button); // loop that appends each button element in the array of tabs
        node.insertBefore(tabList, node.firstChild); // inserts the first child node

        function selectTab(selectedTab) { // sets tab styles based off the selected tab
            for (let tab of tabs) { // loops each tab element within the array of tabs
                let selected = tab == selectedTab; // changes style for selected Node and other child nodes
                tab.node.style.display = selected ? "" : "none"; // sets display style based off the selected tabs/nodes
                tab.button.style.color = selected ? "red" : ""; // sets letter color for selected/visible and hidden tabs
            }
        }
        selectTab(tabs[0]); // sets tab styles based off the selected tab
    }

    asTabs(document.querySelector("tab-panel")); // returns the first element that is a descendant of the tab panel
</script>
