DROP PROCEDURE IF EXISTS set_product_qty;
DELIMITER $$$
CREATE PROCEDURE set_product_qty(_sku varchar(64), _qty int)
    not deterministic modifies sql data
BEGIN
    UPDATE cataloginventory_stock_item AS csi
        JOIN catalog_product_entity AS cpe ON cpe.entity_id = csi.product_id
    SET csi.qty = (@qty:= _qty),
        csi.is_in_stock = IF(@qty > 0, 1, 0),
        csi.stock_status_changed_auto = IF(@qty > 0, 1, csi.stock_status_changed_auto)
    WHERE cpe.sku LIKE CONCAT(_sku, '%');

    INSERT INTO cataloginventory_stock_status (`product_id`, `website_id`, `stock_id`, `qty`, `stock_status`)
    SELECT cpe.entity_id, 0, 1, csi.qty, csi.qty > 0
    FROM catalog_product_entity AS cpe
             JOIN cataloginventory_stock_item csi ON csi.product_id = cpe.entity_id
    WHERE cpe.sku LIKE CONCAT(_sku, '%')
    ON DUPLICATE KEY UPDATE qty = VALUES(`qty`), stock_status = VALUES(`stock_status`);

    INSERT INTO inventory_source_item (`source_code`, `sku`, `quantity`, `status`)
    SELECT 'default', cpe.sku, csi.qty, csi.qty > 0
    FROM catalog_product_entity AS cpe
             JOIN cataloginventory_stock_item csi ON csi.product_id = cpe.entity_id
    WHERE cpe.sku LIKE CONCAT(_sku, '%')
    ON DUPLICATE KEY UPDATE quantity = VALUES(`quantity`), status = VALUES(`status`);
END $$$
DELIMITER ;

DROP PROCEDURE IF EXISTS set_product_attribute_int;
DELIMITER $$$
CREATE PROCEDURE set_product_attribute_int(_sku varchar(64), _attribute_code varchar(64), _value int)
    not deterministic modifies sql data
BEGIN
    INSERT INTO catalog_product_entity_int (`attribute_id`, `row_id`, `value`)
    SELECT ea.attribute_id, cpe.row_id, _value
    FROM catalog_product_entity AS cpe
             INNER JOIN `eav_entity_type` AS `eet` ON eet.entity_type_code = 'catalog_product'
             INNER JOIN `eav_attribute` AS `ea`
                        ON  ea.entity_type_id = eet.entity_type_id
                            AND ea.attribute_code = _attribute_code
    WHERE cpe.sku LIKE CONCAT(_sku, '%')
    ON DUPLICATE KEY UPDATE value = VALUES(`value`);
END $$$
DELIMITER ;

DROP PROCEDURE IF EXISTS set_product_attribute_datetime;
DELIMITER $$$
CREATE PROCEDURE set_product_attribute_datetime(_sku varchar(64), _attribute_code varchar(64), _value datetime)
    not deterministic modifies sql data
BEGIN
    INSERT INTO catalog_product_entity_datetime (`attribute_id`, `row_id`, `value`)
    SELECT ea.attribute_id, cpe.row_id, _value
    FROM catalog_product_entity AS cpe
             INNER JOIN `eav_entity_type` AS `eet` ON eet.entity_type_code = 'catalog_product'
             INNER JOIN `eav_attribute` AS `ea`
                        ON  ea.entity_type_id = eet.entity_type_id
                            AND ea.attribute_code = _attribute_code
    WHERE cpe.sku LIKE CONCAT(_sku, '%')
    ON DUPLICATE KEY UPDATE value = VALUES(`value`);
END $$$
DELIMITER ;

DROP PROCEDURE IF EXISTS get_product_attribute_int;
DELIMITER $$$
CREATE PROCEDURE get_product_attribute_int(_sku varchar(64), _attribute_code varchar(64))
    not deterministic modifies sql data
BEGIN
    SELECT cpe.sku, cpei.store_id, IFNULL(cpei.value, ea.default_value) as value
    FROM catalog_product_entity AS cpe
             INNER JOIN `eav_entity_type` AS `eet` ON eet.entity_type_code = 'catalog_product'
             INNER JOIN `eav_attribute` AS `ea`
                        ON  ea.entity_type_id = eet.entity_type_id
                            AND ea.attribute_code = _attribute_code
             LEFT JOIN catalog_product_entity_int AS cpei ON cpei.row_id = cpe.row_id AND cpei.attribute_id = ea.attribute_id
    WHERE cpe.sku LIKE CONCAT(_sku, '%');
END $$$
DELIMITER ;

DROP PROCEDURE IF EXISTS remove_attribute_value_int;
DELIMITER $$$
CREATE PROCEDURE remove_attribute_value_int(_attribute_code varchar(64))
    not deterministic modifies sql data
BEGIN
    DELETE v
    FROM catalog_product_entity_int AS v
             JOIN eav_attribute AS a ON  a.attribute_id = v.attribute_id
    WHERE a.attribute_code = _attribute_code;
END $$$
DELIMITER ;

DROP PROCEDURE IF EXISTS remove_attribute_value_int;
DELIMITER $$$
CREATE PROCEDURE remove_attribute_value_int(_attribute_code varchar(64))
    not deterministic modifies sql data
BEGIN
    DELETE v
    FROM catalog_product_entity_int AS v
             JOIN eav_attribute AS a ON  a.attribute_id = v.attribute_id
    WHERE a.attribute_code = _attribute_code;
END $$$
DELIMITER ;

DROP PROCEDURE IF EXISTS remove_order_shipment;
DELIMITER $$$
CREATE PROCEDURE remove_order_shipment(_increment_id varchar(64))
    not deterministic modifies sql data
BEGIN
    DELETE ss, ssg
    FROM sales_order AS so
    LEFT JOIN sales_shipment_grid AS ssg ON ssg.order_id = so.entity_id
    LEFT JOIN sales_shipment AS ss ON ss.order_id = so.entity_id
    WHERE so.increment_id = _increment_id;

    -- reset order item qty
    UPDATE sales_order AS so
    JOIN sales_order_item AS soi ON soi.order_id = so.entity_id
    SET soi.qty_shipped = 0
    WHERE so.increment_id = _increment_id;
END $$$
DELIMITER ;


-- CALL set_product_qty('990526537', 0);
-- CALL set_product_attribute_int('990526537', 'stock_ongoing', 1);
-- CALL get_product_attribute_int('3686760036', 'stock_ongoing');
-- CALL remove_attribute_value_int('stock_ongoing');