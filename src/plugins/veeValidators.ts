import { defineRule } from 'vee-validate';
import AllRules from '@vee-validate/rules';
import isValidDomain from 'is-valid-domain';
import logger from "@/utils/logger";

Object.keys(AllRules).forEach(rule => defineRule(rule, AllRules[rule]));



defineRule('required', (value:string|boolean, unused:unknown,ctx) => !value ? `${ctx.field} is a required field` : true)
defineRule('accept', (value:string|boolean, unused:unknown,ctx) => value === true ? true : `You must accept ${ctx.field}`)

defineRule('domainName', (value:string) =>{
    if (!value || !value.length) return true
    if(!isValidDomain(value)) return 'Needs to be a valid Domain Name ie: domain.com'
    return true
})
defineRule('email', (value:string) => {
    // Field is empty, should pass
    if (!value || !value.length) {
        return true;
    }
    // Check if email
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return 'This field must be a valid email';
    }
    return true;
});
defineRule('password', (value:string) => {
    // Field is empty, should pass
    if (!value || !value.length) {
        return true;
    }
    if(value.length < 8) return 'Minimum password lenght is 8 characters'
    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-_]).*$/.test(value)) {
        return 'Password should have at least one uppercase, one lowercase one number and one special character';
    }
    return true;
});

defineRule('confirmed', (value:string, [target]:[target?:string]) => value === target ? true : 'Passwords doesnt match')
