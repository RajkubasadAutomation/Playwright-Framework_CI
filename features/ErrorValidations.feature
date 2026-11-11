Feature: Ecommerce Valiadtions
  @Validation
  @foo
  Scenario Outline: validating the invalid login details
    Given a login Ecommerce2 application  with "<user>" and "<pass>"
    Then verify Error Message is displayed

    Examples:
      | user              | pass     |
      | testing@gmail.com | Test@23  |