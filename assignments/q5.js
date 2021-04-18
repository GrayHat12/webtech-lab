function incrementAndAssign(src, target) {
    src += 1;
    Object.assign(target, src);
    return [src, target];
}