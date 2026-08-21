# Load the user's global R profile first when one exists.
if (file.exists("~/.Rprofile")) {
  base::sys.source("~/.Rprofile", envir = environment())
}

# Project defaults for writing Hugo content with blogdown.
options(
  blogdown.hugo.version = "0.165.0",
  blogdown.serve_site.startup = FALSE,
  blogdown.knit.on_save = TRUE,
  blogdown.method = "markdown",
  blogdown.author = "Lara Srinath",
  blogdown.ext = ".Rmd",
  blogdown.subdir = "blog",
  blogdown.yaml.empty = TRUE,
  blogdown.new_bundle = TRUE,
  blogdown.title_case = TRUE
)
