terraform {
  backend "s3" {
    bucket = "terraformstate-00"
    key    = "terraform-altschool/backend"
    region = "eu-west-1"
  }
}
