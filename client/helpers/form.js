getVal = function(e, name) {
    return $(e.target).find('[name=' + name + ']').val();
};