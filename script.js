const $_dqs = (s) => document.querySelector(s);
const $_dqsa = (s) => document.querySelectorAll(s);
const $_dce = (s) => document.createElement(s);

const $_lab_menu = $_dqs('.js-lab-menu');
const $_lab_content = $_dqs('.js-lab-content');

function initializeTabSystem(menuContainer, contentContainer, itemSelector, titleDatasetKey, tabButtonClass, defaultTitle) {
    const items = Array.from(contentContainer.querySelectorAll(itemSelector));

    const selectItem = (itemToSelect) => {
        if (itemToSelect.classList.contains('js-disabled'))
            return;
        itemToSelect.style.display = ''; 
        if (itemToSelect.tabButton) {
            itemToSelect.tabButton.classList.add('selected');
        }

        items.forEach(item => {
            if (item !== itemToSelect) {
                item.style.display = 'none';
                if (item.tabButton) {
                    item.tabButton.classList.remove('selected');
                }
            }
        });
    };

    items.forEach(item => {
        const title = item.dataset[titleDatasetKey] || defaultTitle;
        const tabButton = $_dce('div');
        
        const is_sub = item.dataset.type == 'sub';
        const is_disabled = item.classList.contains('js-disabled');
        
        tabButton.className = tabButtonClass + (is_sub ? ' sub' : '') + (is_disabled ? ' disabled' : '');
        tabButton.textContent = title;
        
        tabButton.addEventListener('click', () => selectItem(item));
        
        item.tabButton = tabButton; 
        menuContainer.append(tabButton);
    });

    selectItem(items[0]);
}

const mainLabMenu = $_dqs('.js-lab-menu');
const mainLabContent = $_dqs('.js-lab-content');


initializeTabSystem(
    mainLabMenu,
    mainLabContent,
    '.js-lab-unit',
    'title',
    'button border-radius js-main-menu-button',
    'Вкладинка'
);

const mainUnits = Array.from(mainLabContent.querySelectorAll('.js-lab-unit'));

mainUnits.forEach(mainUnit => {
    const subUnitItems = Array.from(mainUnit.querySelectorAll('.js-lab-unit-item'));

    if (subUnitItems.length > 0) {
        const subMenuContainer = $_dce('div');
        subMenuContainer.className = 'lab-unit-menu js-lab-unit-menu';
        mainUnit.insertBefore(subMenuContainer, mainUnit.firstChild);
        
        subUnitItems.forEach(sui => sui.classList.add('lab-unit-item', 'border-radius'))

        initializeTabSystem(
            subMenuContainer,
            mainUnit,
            '.js-lab-unit-item',
            'title',
            'submenu-button border-radius js-submenu-button',
            'Пункт'
        );
    }
});