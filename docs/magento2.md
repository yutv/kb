##PhpStorm

    php bin/magento dev:urn-catalog:generate .idea/misc.xml

##Unison profile

~/.unison/magento2.prf
    
    include default
    ignore = Path var/?*
    ignore = Path var/.?*
    ignorenot = Path var/generation
    ignore = Path pub/media
    ignore = Path pub/static
    
    
##Create Magento Project

    cd ~/public_html
    # create project based on the latest magento version
    composer create-project --repository-url=https://repo.magento.com/ magento/project-community-edition m23x
    
    # create project based on specific magento version
    # composer create-project --repository-url=https://repo.magento.com/ magento/project-community-edition=2.2.7 m22x

##Upgrade Magento Project

    cp composer.json composer.json.bak
    composer require magento/product-community-edition 2.2.7 --no-update
    composer update
    php bin/magento setup:upgrade
    
##Create module package

For Marketplace:

    git clone https://git.example.com/Vendor_Module.git
    cd Vendor_Module
    zip -r9 "vendor-module-1.0.0.zip" . -x *.git* *.idea*
    
Alternative way (archive will have a path app/code/Vendor/Module/):

    zip -r9 "vendor-module-1.0.0.zip" app/code/Vendor/Module/ -x *.git*

##Configuration
###Disable timestamp in static paths like pub/static12345993943/some.js

via Magento Admin:
    
    Stores > Configuration > Advanced > Developer > Static Files Settings > Sign Static Files > No

via SQL query:

    INSERT INTO core_config_data (`path`, `value`) VALUES ("dev/static/sign", 0) ON DUPLICATE KEY UPDATE `value`=0

cli command:

    


##Layout
###Add block with html content
    
    <referenceContainer name="content">
        <block class="Magento\Framework\View\Element\Text" name="my.block.name">
            <arguments>
                <argument translate="true" name="text" xsi:type="string">
                    Lorem ipsum dolor ...
                </argument>
            </arguments>
        </block>
    </referenceContainer>

### Add content block by id
    <referenceContainer name="content">
        <block class="Magento\Cms\Block\Block" name="my.content.block">
            <arguments>
                <argument name="block_id" xsi:type="string">my-content-block-id</argument>
            </arguments>
        </block>
    </referenceContainer>

### Add block to page head section
    
    <referenceBlock name="head.additional">
        <block class="Magento\Framework\View\Element\Text" 
               name="my.block.name" 
               template="Vendor_Module::template.phtml" />
    </referenceBlock>

##Javascript

### Show all UI components on the page

    require('uiRegistry').get(function(item) { console.log(item.name, item); });

## Add administrator

    php bin/magento admin:user:create --admin-user=admin --admin-password=password --admin-email=support@example.com --admin-firstname=Support --admin-lastname=Account
