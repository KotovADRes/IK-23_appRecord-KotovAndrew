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

/* function resizeIframe(iframe) {
    iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 'px';
}

const labPages = Array.from($_lab_content.querySelectorAll('iframe.js-page-iframe'));

labPages.forEach(function(iframe) {
    iframe.onload = () => {resizeIframe(iframe)};
}); */

/* if ($_lab_menu && $_lab_content) {
    const units = Array.from($_lab_content.querySelectorAll('.js-lab-unit'));

    if (units.length > 0) {
        const selectUnit = (unitToSelect) => {
            units.forEach(unit => {
                const isSelected = (unit === unitToSelect);
                unit.style.display = isSelected ? '' : 'none';
                if (unit.tabButton) {
                    unit.tabButton.classList.toggle('selected', isSelected);
                }
            });
        };

        units.forEach(unit => {
            const title = unit.dataset.title || 'Вкладинка';
            const tabButton = $_dce('div');
            
            tabButton.classList = ['button border-radius js-main-menu-button'];
            tabButton.textContent = title;
            
            tabButton.addEventListener('click', () => selectUnit(unit));
            
            unit.tabButton = tabButton; 
            
            $_lab_menu.append(tabButton);
            
            const submenu = $_dce('div');
            submenu.classList = ['lab-unit-menu js-lab-unit-menu'];
            
            unit_items = Array.from(unit.querySelectorAll('.js-lab-unit-item'));
            unit_items.forEach(u_item => {
                const sm_title = unit.dataset.title || 'Пункт';
                const submenu_item = $_dce('div');
                submenu_item.innerText = sm_title;
                submenu.append(submenu_item);
            });
            
            unit.insertBefore(submenu, unit.firstChild);
        });

        selectUnit(units[0]);
    }
}
 */


/* $_lab_content.units = [];

$_lab_content.selectTab = function (lab_unit) {
    const selected = $_lab_content.units.filter(lu => lu === lab_unit);
    if (selected.length < 1)
        return;
    
    selected[0].switch_it(true);
    $_lab_content.units.filter(lu => lu !== selected[0]).forEach(lu => lu.switch_it(false));
}

$_lab_menu.tabs = [];
$_lab_menu.addTab = function(lab_unit) {
    if ( this.tabs.includes(lab_unit) )
        return;
    const title = lab_unit.dataset.title;
    const div = $_dce('div');
    div.classList = ['js-main-menu-button'];
    div.innerText = title;
    div.addEventListener('click', () => $_lab_content.selectTab(lab_unit));
    lab_unit.select_button = div;
    this.append(div);
}

$_lab_content.querySelectorAll('.js-lab-unit').forEach(function(lab_unit) {
    $_lab_menu.addTab(lab_unit);
});

$_lab_content.units = (function () {
    const units = [...this.querySelectorAll('.js-lab-unit')];
    units.forEach(u => {
        u.switch_it = is_on => {
            if (is_on) {
                u.style.display = '';
                if (u.select_button !== undefined)
                    u.select_button.classList.add('selected');
            } else {
                u.style.display = 'none';
                if (u.select_button !== undefined)
                    u.select_button.classList.remove('selected');
            }
        }
    });
    return units;
})(); */