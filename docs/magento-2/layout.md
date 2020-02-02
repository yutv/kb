##Add block with html content
```xml
<referenceContainer name="content">
    <block class="Magento\Framework\View\Element\Text" name="my.block.name">
        <arguments>
            <argument translate="true" name="text" xsi:type="string">
                Lorem ipsum dolor ...
            </argument>
        </arguments>
    </block>
</referenceContainer>
```
## Add content block by id
```xml
<referenceContainer name="content">
    <block class="Magento\Cms\Block\Block" name="my.content.block">
        <arguments>
            <argument name="block_id" xsi:type="string">my-content-block-id</argument>
        </arguments>
    </block>
</referenceContainer>
```
## Add block to page head section
```xml
<referenceBlock name="head.additional">
    <block class="Magento\Framework\View\Element\Text" 
           name="my.block.name" 
           template="Vendor_Module::template.phtml" />
</referenceBlock>
```
