Feature: Ecommerce Valiadtions

  @Regression
  Scenario: Placeing the Order
    Given a login Ecommerce application  with "<username>" and "<password>"
    When add "<productName>" to cart
    Then verify "<productName>" is displayed in the cart
    When enter valid details and place the order
    Then verify order is present in ther order history 

    Examples:
        | username              | password | productName |
        | testing1996@gmail.com | Test@123 | ZARA COAT 3 |
        | testing1996@gmail.com | Test@123 |iphone 13 pro|